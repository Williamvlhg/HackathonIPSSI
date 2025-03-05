/* eslint-disable react-hooks/rules-of-hooks */

import { User } from '@/types/user'
import { useQuery } from '@tanstack/react-query'

export function getEmployes() {
  const { data, isLoading, refetch } = useQuery<{ data: Array<User> }>({
    queryKey: ['employes'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/user/all')
      return await res.json()
    },
  })

  // refetch employes pour pas actualiser la page pour avoir les données
  return { data, isLoading, refetch }
}
