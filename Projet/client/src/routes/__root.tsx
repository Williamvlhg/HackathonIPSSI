import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useCookies } from 'react-cookie'

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
      </>
    )
  },
})
