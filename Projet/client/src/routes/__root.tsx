import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cookies] = useCookies(['user'])
    const navigate = useNavigate()
    // on check si le user est connecté
    
    useEffect(() => {
      if (!cookies.user) {
        navigate({to: '/login'})
      }
    }, [cookies, navigate])


    return (
      <>
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
      </>
    )
  },
})
