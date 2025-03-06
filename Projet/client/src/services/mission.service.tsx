/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Mission } from '@/types/mission'
import { z } from 'zod'

// A REMPLACER OU ALORS ON LE GARDE
export const missionSchema = z.object({
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  workerId: z.number(),
  siteId: z.number(),
})
// A REMPLACER OU ALORS ON LE GARDE

/**
 * Récupérer toutes les missions
 * @returns Mission[]
 */
export function getMissions() {
  const { data, isLoading, refetch, error } = useQuery<{ data: Array<Mission> }>({
    queryKey: ['missions'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/mission/all')
      if (!res.ok) {
        throw new Error('Failed to fetch missions')
      }
      return await res.json()
    },
  })

  if (error) {
    toast('Erreur lors de la récupération des missions')
  }

  return { data, isLoading, refetch, error }
}

/**
 * Récupérer une mission par son id
 * @param missionId
 * @returns Mission
 */
export function getMission(missionId: number) {
  const { data, isLoading, refetch, error } = useQuery<{ data: Mission }>({
    queryKey: ['mission', missionId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/mission/${missionId}`)
      if (!res.ok) {
        throw new Error('Failed to fetch mission')
      }
      return await res.json()
    },
  })

  if (error) {
    toast('Erreur lors de la récupération de la mission')
  }

  return { data, isLoading, refetch }
}

/**
 * Ajouter une mission
 * @returns void
 */
export function addMission() {
  const { refetch } = getMissions()

  const { mutate } = useMutation<
    { success: boolean; message: string },
    Error,
    z.infer<typeof missionSchema>
  >({
    mutationKey: ['addMission'],
    mutationFn: async (values: z.infer<typeof missionSchema>) => {
      const res = await fetch('http://localhost:8080/mission/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      refetch()
      return await res.json()
    },

    onError: () => {
      toast('Une erreur est survenue')
    },

    onSuccess: () => {
      toast('Mission créée')
    },
  })

  return { mutate }
}

/**
 * Mettre à jour une mission
 * @param missionId
 * @returns void
 */
export function updateMission(missionId: number) {
  const { refetch } = getMissions()

  const { mutate } = useMutation<
    { success: boolean; message: string },
    Error,
    z.infer<typeof missionSchema>
  >({
    mutationKey: ['updateMission'],
    mutationFn: async (values: z.infer<typeof missionSchema>) => {
      const res = await fetch(`http://localhost:8080/mission/${missionId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        throw new Error('Failed to update mission')
      }

      return await res.json()
    },

    onError: (data) => {
      console.log(data)
      toast(data.message)
    },

    onSuccess: (data) => {
      toast(data.message)
      refetch()
    },
  })

  return { mutate }
}
export function deleteMission(missionId: number) {
  const { refetch } = getMissions()

  const { mutate } = useMutation({
    mutationKey: ['deleteMission'],
    mutationFn: async () => {
      const res = await fetch(`http://localhost:8080/mission/${missionId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error('Failed to delete mission')
      }

      refetch()
      toast('Mission supprimée')
      return await res.json()
    },

    onError: () => {
      toast('Une erreur est survenue lors de la suppression de la mission')
    },
  })

  return { mutate }
}
