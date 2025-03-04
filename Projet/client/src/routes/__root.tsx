import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/profile" className="[&.active]:font-bold">
          Profile
        </Link>
        <Link to="/calendar" className="[&.active]:font-bold">
         Calendar
          </Link>
        <Link to="/login" className="[&.active]:font-bold">
          login
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})