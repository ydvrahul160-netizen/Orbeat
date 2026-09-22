const API_BASE = '/api'

async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
  })

  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    const message = data?.message || 'Server error'
    throw new Error(message)
  }

  return data
}

export async function register({ username, email, password }) {
  return fetchJson('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })
}

export async function login({ identifier, password }) {
  return fetchJson('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: identifier, email: identifier, password }),
  })
}

export async function logout() {
  return fetchJson('/auth/logout', {
    method: 'POST',
  })
}

export async function getCurrentUser() {
  return fetchJson('/auth/me')
}

export async function uploadProfileImage(formData) {
  return fetchJson('/auth/profile-image', {
    method: 'POST',
    body: formData,
  })
}

export async function becomeArtist() {
  return fetchJson('/auth/become-artist', {
    method: 'POST',
  })
}

export async function requestPasswordReset(email) {
  return fetchJson('/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
}

export async function resetPassword({ email, token, password }) {
  return fetchJson('/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token, password }),
  })
}

export async function getMusics() {
  return fetchJson('/music')
}

export async function getAlbums() {
  return fetchJson('/music/albums')
}

export async function getAlbumById(albumId) {
  return fetchJson(`/music/albums/${albumId}`)
}

export async function uploadMusic(formData) {
  return fetchJson('/music/upload', {
    method: 'POST',
    body: formData,
  })
}

export async function getArtistMusics() {
  return fetchJson('/music/mine')
}

export async function updateMusic(musicId, data) {
  return fetchJson(`/music/${musicId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function deleteMusic(musicId) {
  return fetchJson(`/music/${musicId}`, {
    method: 'DELETE',
  })
}

export async function createAlbum({ title, musicId }) {
  return fetchJson('/music/album', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, musicId }),
  })
}

export async function getArtistAlbums() {
  return fetchJson('/music/albums/mine')
}

export async function updateAlbum(albumId, data) {
  return fetchJson(`/music/albums/${albumId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function deleteAlbum(albumId) {
  return fetchJson(`/music/albums/${albumId}`, {
    method: 'DELETE',
  })
}

export async function toggleLike(musicId) {
  return fetchJson(`/music/${musicId}/like`, {
    method: 'POST',
  })
}

export async function addComment(musicId, text) {
  return fetchJson(`/music/${musicId}/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
}

export async function recordPlay(musicId) {
  return fetchJson(`/music/${musicId}/play`, {
    method: 'POST',
  })
}
