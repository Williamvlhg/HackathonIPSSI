import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { CookiesProvider, useCookies } from 'react-cookie'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

function App() {
  const queryClient = new QueryClient()
  const [cookies] = useCookies(['user'])

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
