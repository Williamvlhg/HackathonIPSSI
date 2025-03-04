import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "./App.css";

const router = createRouter({ routeTree });

function App() {
  const queryClient = new QueryClient();
  
  return (
    <SidebarProvider>
    <div className="flex h-screen">
      <QueryClientProvider client={queryClient}>
        <AppSidebar />
        <div className="flex-1 p-4 overflow-auto">
          <RouterProvider router={router} />
        </QueryClientProvider>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
