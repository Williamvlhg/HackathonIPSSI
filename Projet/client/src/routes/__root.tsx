import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
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
        <Link to="/employes" className="[&.active]:font-bold">
          Employés
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})