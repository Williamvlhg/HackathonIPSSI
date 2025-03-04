/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProfileImport } from './routes/profile'
import { Route as LoginImport } from './routes/login'
import { Route as CalendarImport } from './routes/calendar'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const ProfileRoute = ProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)


const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const CalendarRoute = CalendarImport.update({
  id: '/calendar',
  path: '/calendar',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }

    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    
    '/calendar': {
      id: '/calendar'
      path: '/calendar'
      fullPath: '/calendar'
      preLoaderRoute: typeof CalendarImport
      parentRoute: typeof rootRoute
    }
    
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute

  '/login': typeof LoginRoute
  
  '/calendar': typeof CalendarRoute

  '/profile': typeof ProfileRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/calendar': typeof CalendarRoute
  '/profile': typeof ProfileRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/calendar': typeof CalendarRoute
  '/profile': typeof ProfileRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/calendar' | '/profile'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/calendar' | '/profile'
  id: '__root__' | '/' | '/calendar' | '/profile'
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LoginRoute: typeof LoginRoute
  CalendarRoute: typeof CalendarRoute
  ProfileRoute: typeof ProfileRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LoginRoute: LoginRoute,
  CalendarRoute: CalendarRoute,
  ProfileRoute: ProfileRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/calendar",
        "/profile"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/calendar": {
      "filePath": "calendar.tsx"
     },
    "/profile": {
      "filePath": "profile.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
