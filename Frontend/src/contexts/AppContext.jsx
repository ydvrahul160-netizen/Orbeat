import { createContext, useCallback, useContext, useState, useEffect, useRef } from 'react'
import {
  login,
  logout,
  register,
  getAlbums,
  getAlbumById,
  getMusics,
  uploadMusic,
  getArtistMusics,
  updateMusic,
  deleteMusic,
  createAlbum,
  getArtistAlbums,
  updateAlbum,
  deleteAlbum,
  getCurrentUser,
  uploadProfileImage,
  toggleLike,
  addComment,
  recordPlay,
  becomeArtist,
  requestPasswordReset,
  resetPassword,
} from '../api.js'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [authChecking, setAuthChecking] = useState(true)
  const [user, setUser] = useState(null)
  const [musics, setMusics] = useState([])
  const [albums, setAlbums] = useState([])
  const [homeSections, setHomeSections] = useState({
    popularRadio: [],
    featuredCharts: [],
    editorPicks: [],
    recommended: [],
    trendingNow: [],
    orbeatCharts: [],
    freshDrops: [],
    creatorSpotlight: [],
    hiddenGems: [],
    recentlyPlayed: [],
  })
  const [artistMusics, setArtistMusics] = useState([])
  const [artistAlbums, setArtistAlbums] = useState([])
  const [artistLoading, setArtistLoading] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [commentLoadingId, setCommentLoadingId] = useState(null)
  const audioRef = useRef(null)
  const countedTrackId = useRef(null)
  const countingTrackId = useRef(null)

  const loadArtistContent = useCallback(async (currentUser) => {
    if (currentUser?.role !== 'artist') {
      setArtistMusics([])
      setArtistAlbums([])
      setArtistLoading(false)
      return
    }

    setArtistLoading(true)
    try {
      const [musicResponse, albumResponse] = await Promise.all([
        getArtistMusics(),
        getArtistAlbums(),
      ])

      setArtistMusics(musicResponse.musics || [])
      setArtistAlbums(albumResponse.albums || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setArtistLoading(false)
    }
  }, [])

  // Check auth on mount
  useEffect(() => {
    let active = true

    getCurrentUser()
      .then(async (response) => {
        if (!active) return
        setUser(response.user)
        await loadContent()
        if (response.user.role === 'artist') {
          await loadArtistContent(response.user)
        }
      })
      .catch(() => {
        if (active) setUser(null)
      })
      .finally(() => {
        if (active) setAuthChecking(false)
      })

    return () => {
      active = false
    }
  }, [loadArtistContent])

  // Load music and albums
  async function loadContent() {
    try {
      const [musicResponse, albumResponse] = await Promise.all([
        getMusics(),
        getAlbums(),
      ])

      setMusics(musicResponse.musics || [])
      setAlbums(albumResponse.albums || [])
      setHomeSections(musicResponse.sections || {
        popularRadio: [],
        featuredCharts: [],
        editorPicks: [],
        recommended: [],
        trendingNow: [],
        orbeatCharts: [],
        freshDrops: [],
        creatorSpotlight: [],
        hiddenGems: [],
        recentlyPlayed: [],
      })
    } catch (err) {
      setError(err.message)
    }
  }

  // Update music in state
  function replaceMusic(updatedMusic) {
    setMusics((items) => items.map((item) => (item._id === updatedMusic._id ? updatedMusic : item)))
    setCurrentTrack((track) => (track?._id === updatedMusic._id ? updatedMusic : track))
    setHomeSections((sections) => Object.fromEntries(
      Object.entries(sections).map(([section, items]) => [
        section,
        items.map((item) => item._id === updatedMusic._id ? updatedMusic : item),
      ]),
    ))
    setSelectedAlbum((album) => {
      if (!album?.musics) return album
      return {
        ...album,
        musics: album.musics.map((track) => (track._id === updatedMusic._id ? updatedMusic : track)),
      }
    })
  }

  // Auth functions
  async function handleLogin(credentials) {
    try {
      setError('')
      setMessage('')
      const response = await login(credentials)
      setUser(response.user)
      await loadContent()
      await loadArtistContent(response.user)
      setMessage('Welcome ' + response.user.username)
      return response.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function handleRegister(credentials) {
    try {
      setError('')
      setMessage('')
      const response = await register(credentials)
      setUser(response.user)
      await loadContent()
      await loadArtistContent(response.user)
      setMessage('Account created!')
      return response.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function handleLogout() {
    try {
      await logout()
    } catch {
      // Local logout should still reset the UI
    }

    setUser(null)
    setMusics([])
    setAlbums([])
    setHomeSections({ popularRadio: [], featuredCharts: [], editorPicks: [], recommended: [], trendingNow: [], orbeatCharts: [], freshDrops: [], creatorSpotlight: [], hiddenGems: [], recentlyPlayed: [] })
    setArtistMusics([])
    setArtistAlbums([])
    setSelectedAlbum(null)
    setCurrentTrack(null)
    setIsPlaying(false)
    setQuery('')
    setMessage('')
    setError('')
  }

  // Album functions
  const handleSelectAlbum = useCallback(async (albumId) => {
    try {
      setError('')
      const res = await getAlbumById(albumId)
      setSelectedAlbum(res.album)
      return res.album
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  // Music functions
  async function handleUpload(formData) {
    try {
      setError('')
      await uploadMusic(formData)
      await loadContent()
      await loadArtistContent(user)
      setMessage('Song uploaded!')
      return true
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function handleCreateAlbum(data) {
    try {
      setError('')
      await createAlbum(data)
      await loadContent()
      await loadArtistContent(user)
      setMessage('Album created!')
      return true
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function handleUpdateMusic(musicId, data) {
    try {
      setError('')
      await updateMusic(musicId, data)
      await loadContent()
      await loadArtistContent(user)
      setMessage('Song updated!')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function handleDeleteMusic(musicId) {
    try {
      setError('')
      await deleteMusic(musicId)
      await loadContent()
      await loadArtistContent(user)
      setMessage('Song deleted!')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function handleUpdateAlbum(albumId, data) {
    try {
      setError('')
      await updateAlbum(albumId, data)
      await loadContent()
      await loadArtistContent(user)
      setMessage('Album updated!')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function handleDeleteAlbum(albumId) {
    try {
      setError('')
      await deleteAlbum(albumId)
      await loadContent()
      await loadArtistContent(user)
      setMessage('Album deleted!')
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function handlePlay(track) {
    countedTrackId.current = null
    countingTrackId.current = null
    setIsPlaying(false)
    setCurrentTrack(track)
  }

  async function handleTogglePlayback(track) {
    const audio = audioRef.current
    const isCurrentTrack = currentTrack?._id === track?._id

    if (audio && isCurrentTrack) {
      if (audio.paused) {
        try {
          await audio.play()
        } catch (err) {
          setError('Unable to start this audio.')
        }
      } else {
        audio.pause()
      }
      return
    }

    await handlePlay(track)
  }

  async function handleTrackStarted(track) {
    if (!track || countedTrackId.current === track._id || countingTrackId.current === track._id) {
      return
    }

    countingTrackId.current = track._id
    try {
      const response = await recordPlay(track._id)
      countedTrackId.current = track._id
      replaceMusic(response.music)
    } catch (err) {
      setError(err.message)
    } finally {
      countingTrackId.current = null
    }
  }

  function handleTrackEnded(track) {
    if (track?._id === countedTrackId.current) {
      countedTrackId.current = null
    }
  }

  async function handleLike(musicId) {
    try {
      const response = await toggleLike(musicId)
      replaceMusic(response.music)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleComment(musicId, text) {
    setCommentLoadingId(musicId)
    try {
      const response = await addComment(musicId, text)
      replaceMusic(response.music)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setCommentLoadingId(null)
    }
  }

  async function handleBecomeArtist() {
    try {
      setError('')
      const response = await becomeArtist()
      setUser(response.user)
      setMessage('Artist account created!')
      return response.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function handleProfileImageUpload(formData) {
    try {
      setError('')
      const response = await uploadProfileImage(formData)
      setUser(response.user)
      setMessage('Profile image updated!')
      return response.user
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function handleRequestPasswordReset(email) {
    setError('')
    setMessage('')
    try {
      const response = await requestPasswordReset(email)
      setMessage(response.message)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  async function handleResetPassword(credentials) {
    setError('')
    setMessage('')
    try {
      const response = await resetPassword(credentials)
      setMessage(response.message)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const value = {
    // State
    authChecking,
    user,
    musics,
    albums,
    homeSections,
    artistMusics,
    artistAlbums,
    artistLoading,
    selectedAlbum,
    currentTrack,
    audioRef,
    isPlaying,
    query,
    error,
    message,
    commentLoadingId,

    // Setters
    setUser,
    setMusics,
    setAlbums,
    setSelectedAlbum,
    setCurrentTrack,
    setIsPlaying,
    setQuery,
    setError,
    setMessage,

    // Functions
    loadContent,
    loadArtistContent,
    replaceMusic,
    handleLogin,
    handleRegister,
    handleLogout,
    handleSelectAlbum,
    handleUpload,
    handleUpdateMusic,
    handleDeleteMusic,
    handleCreateAlbum,
    handleUpdateAlbum,
    handleDeleteAlbum,
    handlePlay,
    handleTogglePlayback,
    handleTrackStarted,
    handleTrackEnded,
    handleLike,
    handleComment,
    handleBecomeArtist,
    handleProfileImageUpload,
    handleRequestPasswordReset,
    handleResetPassword,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
