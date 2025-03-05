import { LoginForm } from '@/components/login-form'
import { createFileRoute } from '@tanstack/react-router'
import { useCookies } from 'react-cookie'


export const Route = createFileRoute('/login')({
 
  component: Page,
})

function Page() {
  const [cookies] = useCookies(['user'])
  cookies.user ? document.location.href = '/' : null
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  )
}
