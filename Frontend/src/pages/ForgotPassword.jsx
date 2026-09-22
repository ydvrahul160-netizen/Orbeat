import { useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useApp } from '../contexts/AppContext'

export default function ForgotPassword() {
  const { handleRequestPasswordReset, error } = useApp()
  const [email, setEmail] = useState('')
  const [localError, setLocalError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      setLocalError('')
      await handleRequestPasswordReset(email)
      setSubmitted(true)
    } catch (err) {
      setLocalError(err.message)
    }
  }

  return (
    <MainLayout>
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <form className="card w-full" onSubmit={onSubmit}>
          <h1 className="mb-3 text-center text-3xl font-bold text-white">Reset password</h1>
          <p className="mb-6 text-center text-sm text-zinc-400">
            Enter your account email to request password reset instructions.
          </p>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
            required
          />
          {(localError || error) && (
            <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {localError || error}
            </div>
          )}
          {submitted && !localError && !error && (
            <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
              The request was received. Reset delivery must be configured by the server.
            </div>
          )}
          <Button type="submit">Request reset</Button>
          <p className="mt-5 text-center text-sm text-zinc-400">
            <Link className="font-semibold text-green-400 hover:text-green-300" to="/login">
              Return to sign in
            </Link>
          </p>
        </form>
      </div>
    </MainLayout>
  )
}
