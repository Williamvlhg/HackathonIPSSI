import { Briefcase, Calendar, Home, Settings, User, Users } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { getEmploye } from '@/services/employe.service'
import { useCookies } from 'react-cookie'
import { toast } from 'sonner'
import { Button } from './ui/button'

// Menu items.
const items = [
  {
    title: 'Accueil',
    url: '/',
    icon: Home,
  },
  {
    title: 'Profil',
    url: '/profile',
    icon: User,
  },
  {
    title: 'Employés',
    url: '/employes',
    icon: Users,
  },
  {
    title: 'Chantiers',
    url: '/chantier',
    icon: Briefcase,
  },
  {
    title: 'Calendrier',
    url: '/calendar',
    icon: Calendar,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
]

export function AppSidebar() {
  // @ts-expect-error - TUPLE j'utilise uniquement removeCookie
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies(['user'])
  const { data } = getEmploye(cookie.user?.id)

  return (
    <Sidebar className='w-64 h-screen flex flex-col justify-between shadow-lg'>
      <SidebarContent className='flex flex-col h-full'>
        <SidebarGroup>
          <SidebarGroupLabel className='text-gray-700 font-semibold uppercase '>
            Nom App ?
          </SidebarGroupLabel>
          <div className='p-5 border-b text-center'>
            <User className='w-8 h-8 text-gray-700 mx-auto' />
            <h2 className='text-sm font-semibold mt-2'>
              {data?.data
                ? `${data.data.firstName} - ${data.data.lastName}`
                : 'Utilisateur déconncté'}
            </h2>
            <p className='text-xs text-gray-500'>{data?.data ? data.data.email : ''}</p>
          </div>

          {data?.data && (
            <SidebarGroupContent className='flex-grow'>
              <SidebarMenu className='py-5 space-y-5'>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className='py-1'>
                    <SidebarMenuButton className='p-5 justify-start transition-transform transform hover:scale-105 hover:bg-gray-200'>
                      <a href={item.url} className='flex items-center gap-5 px-5 py-2 rounded-lg'>
                        <item.icon className='w-5 h-5 text-gray-700' />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>

      {data?.data && (
        <div className='p-5'>
          <Button
            className='w-full cursor-pointer'
            variant='destructive'
            onClick={() => {
              removeCookie('user')
              document.location.href = '/login'
              toast('Déconnexion')
            }}
          >
            Déconnexion
          </Button>
        </div>
      )}
    </Sidebar>
  )
}
