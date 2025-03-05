import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { CookiesProvider } from 'react-cookie'

const router = createRouter({ routeTree })

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className='flex h-screen'>
          <AppSidebar />
          <div className='p-4 w-full'>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
              <RouterProvider router={router} />
            </CookiesProvider>
          </div>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  )
}

export default App
