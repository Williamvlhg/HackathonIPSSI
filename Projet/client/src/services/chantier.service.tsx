/* eslint-disable react-hooks/rules-of-hooks */

import { addSiteSchema } from '@/features/chantiers/add/add-chantier.schema'
import { updateSiteSchema } from '@/features/chantiers/update/update-chantier.schema'
import { Site } from '@/types/site'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

/**
 * Récupérer tous les chantiers
 * @returns Site[]
 */
export function getSites() {
  const { data, isLoading, refetch, error } = useQuery<{ data: Array<Site> }>({
    queryKey: ['sites'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/site/all')
      return await res.json()
    },
  })

  return { data, isLoading, refetch, error }
}

/**
 * Récupérer un chantier par son id
 * @param id
 * @returns Site
 */
export function getSite(siteId: number) {
  const { data, isLoading, refetch, error } = useQuery<{ data: Site }>({
    queryKey: ['site'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/site/${siteId}`)
      return await res.json()
    },
  })

  return { data, isLoading, refetch, error }
}

/**
 * Supprimer un chantier
 * @param siteId
 * @returns void
 */
export function deleteSite(siteId: number) {
  const { refetch } = getSites()

  const { mutate } = useMutation({
    mutationKey: ['deleteSite'],
    mutationFn: async () => {
      const res = await fetch(`http://localhost:8080/site/${siteId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })

      refetch()
      toast('Chantier supprimé')
      return await res.json()
    },
  })

  return { mutate }
}

export function updateSite(siteId: number) {
  const { refetch } = getSites()

  const { mutate } = useMutation({
    mutationKey: ['updateSite'],
    mutationFn: async (values: z.infer<typeof updateSiteSchema>) => {
      const res = await fetch(`http://localhost:8080/site/${siteId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          address: values.address,
          startDate: values.startDate,
          endDate: values.endDate,
          skills: values.skills,
          workers: values.workers,
        }),
      })

      if (!res.ok) {
        throw new Error('ok')
      }

      return await res.json()
    },

    onError: () => {
      toast('erreur')
    },

    onSuccess: () => {
      toast('Chantier modifié')
      refetch()
    },
  })

  return { mutate }
}

export function addSite() {
  const { refetch } = getSites()

  const { mutate } = useMutation<
    { success: boolean; message: string },
    Error,
    z.infer<typeof addSiteSchema>
  >({
    mutationKey: ['addSite'],
    mutationFn: async (values: z.infer<typeof addSiteSchema>) => {
      const res = await fetch('http://localhost:8080/site/create', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          address: values.address,
          startDate: values.startDate,
          endDate: values.endDate,
          skills: values.skills,
          workers: values.workers,
        }),
      })

      refetch()
      return await res.json()
    },

    onError: () => {
      toast('Une erreur est survenue')
    },

    onSuccess: () => {
      toast('Chantier créé')
    },
  })

  return { mutate }
}