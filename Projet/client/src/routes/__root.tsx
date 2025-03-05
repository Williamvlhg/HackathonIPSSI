import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useCookies } from 'react-cookie'

export const Route = createRootRoute({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cookie] = useCookies(['user'])
    // on check si le user est connecté
    if (cookie.user === undefined) {
      document.location.href = '/login'
    }

    return (
      <>
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
      </>
    )
  },
})
