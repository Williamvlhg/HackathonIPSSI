import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { CookiesProvider } from 'react-cookie'
import { useCookies } from 'react-cookie'


const router = createRouter({ routeTree })

function App() {
  const queryClient = new QueryClient()
  const [cookies] = useCookies(['user']) 
  console.log(cookies)
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <div className='flex h-screen'>
        {cookies.user ? <AppSidebar /> : null}
          <div className='p-4 w-full'>
              <RouterProvider router={router} />
          </div>
        </div>
        </CookiesProvider>
      </SidebarProvider>
    </QueryClientProvider>
  )
}

export default App
