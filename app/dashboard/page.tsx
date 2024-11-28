import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const userId = cookies().get('user_session')?.value

  if (!userId) {
    redirect('/')
  }

  async function logout() {
    'use server'
    cookies().delete('user_session')
    redirect('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to your Dashboard
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          You are logged in with user ID: {userId}
        </p>
        <form action={logout}>
          <Button type="submit" className="w-full mt-4">
            Logout
          </Button>
        </form>
      </div>
    </div>
  )
}

