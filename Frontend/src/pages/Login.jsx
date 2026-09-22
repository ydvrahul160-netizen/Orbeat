import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import { useApp } from '../contexts/AppContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { handleLogin, error } = useApp()
  const [localError, setLocalError] = useState('')

  const onLogin = async (credentials) => {
    try {
      setLocalError('')
      await handleLogin(credentials)

      const destination = location.state?.from

      navigate(
        destination && destination !== '/login'
          ? destination
          : '/',
        { replace: true }
      )
    } catch (err) {
      setLocalError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center gap-10 px-6 lg:justify-between">
        
        <section className="hidden max-w-xl lg:block">
          <p className="text-sm font-bold uppercase text-green-400">
            Orbeat
          </p>

          <h1 className="mt-4 text-7xl font-black leading-none">
            Music for every mood.
          </h1>

          <p className="mt-6 text-lg text-zinc-300">
            Register once. After that signup will not be asked while your
            login session is active.
          </p>
        </section>

        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl font-black text-green-500">
              Orbeat
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Login to continue to your dashboard.
            </p>
          </div>

          <LoginForm
            onLogin={onLogin}
            error={localError || error}
          />

          <p className="mt-4 text-center text-sm text-zinc-400">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-green-400 hover:text-green-300"
            >
              Register here
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}