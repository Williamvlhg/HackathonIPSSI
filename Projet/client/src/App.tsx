import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

const router = createRouter({ routeTree })

function App() {
  const queryClient = new QueryClient();

  return (
    <SidebarProvider>
      <AppSidebar />
        <div>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        </div>
    </SidebarProvider>
  );
}

export default App
