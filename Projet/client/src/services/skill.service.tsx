/* eslint-disable react-hooks/rules-of-hooks */
import { Skill } from '@/types/skill'
import { useQuery } from '@tanstack/react-query'

export function getSkills() {
  const { data, isLoading, refetch } = useQuery<{ data: Array<Skill> }>({
    queryKey: ['skills'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/skill/all')
      return await res.json()
    },
  })

  return { data, isLoading, refetch }
}
