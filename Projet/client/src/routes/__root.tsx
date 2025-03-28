/* eslint-disable react-hooks/rules-of-hooks */
import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'

export const Route = createRootRoute({
  component: () => {
    const [cookies] = useCookies(['user'])
    const navigate = useNavigate()

    // on check si le user est connecté
    useEffect(() => {
      if (!cookies.user) {
        navigate({ to: '/login' })
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
