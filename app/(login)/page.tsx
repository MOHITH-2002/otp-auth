import LoginForm from './LoginForm'

async function getCaptcha() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate-captcha`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch captcha')
  }
  return res.json()
}

export default async function LoginPage() {
  const { captchaText } = await getCaptcha()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
        <LoginForm captchaText={captchaText} />
      </div>
    </div>
  )
}

