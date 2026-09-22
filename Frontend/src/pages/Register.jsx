import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import RegisterForm from '../components/auth/RegisterForm'
import { useApp } from '../contexts/AppContext'

export default function Register() {
  const navigate = useNavigate()
  const { handleRegister, error } = useApp()
  const [localError, setLocalError] = useState('')

  const onRegister = async (credentials) => {
    try {
      setLocalError('')
      await handleRegister(credentials)
      navigate('/', { replace: true })
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
            Join the music revolution.
          </h1>

          <p className="mt-6 text-lg text-zinc-300">
            Create your account today and start streaming your favorite music.
          </p>
        </section>

        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl font-black text-green-500">
              Orbeat
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Create a new account to get started.
            </p>
          </div>

          <RegisterForm
            onRegister={onRegister}
            error={localError || error}
          />

          <p className="mt-4 text-center text-sm text-zinc-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-green-400 hover:text-green-300"
            >
              Login here
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}