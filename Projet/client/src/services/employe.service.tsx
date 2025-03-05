/* eslint-disable react-hooks/rules-of-hooks */

import { addEmployeSchema } from '@/features/employes/add/add-employe.schema'
import { updateEmployeSchema } from '@/features/employes/update/update-employe.schema'
import { User } from '@/types/user'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

/**
 * Récupérer tous les employés
 * @returns User[]
 */
export function getEmployes() {
  const { data, isLoading, refetch } = useQuery<{ data: Array<User> }>({
    queryKey: ['employes'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/user/all')
      return await res.json()
    },
  })

  return { data, isLoading, refetch }
}

/**
 * Récupérer un employé par son id
 * @param id
 * @returns User
 */
export function getEmploye(userId: number) {
  const { data, isLoading, refetch } = useQuery<{ data: User }>({
    queryKey: ['employe'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8080/user/${userId}`)
      return await res.json()
    },
  })

  return { data, isLoading, refetch }
}

/**
 * Supprimer un employé
 * @param userId
 * @returns void
 */
export function deleteEmploye(userId: number) {
  const { refetch } = getEmployes()

  const { mutate } = useMutation({
    mutationKey: ['deleteEmploye'],
    mutationFn: async () => {
      const res = await fetch(`http://localhost:8080/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      })

      refetch()
      toast('Utilisateur supprimé')
      return await res.json()
    },
  })

  return { mutate }
}

export function updateEmploye(userId: number) {
  const { refetch } = getEmployes()

  const { mutate } = useMutation({
    mutationKey: ['updateEmploye'],
    mutationFn: async (values: z.infer<typeof updateEmployeSchema>) => {
      const res = await fetch(`http://localhost:8080/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          roleId: Number(values.roleId),
        }),
      })

      return await res.json()
    },

    onError: () => {
      toast('Une erreur est survenue')
    },

    onSuccess: () => {
      toast('Utilisateur modifié')
      refetch()
    },
  })

  return { mutate }
}

export function addEmploye() {
  const { refetch } = getEmployes()

  const { mutate } = useMutation<
    { success: boolean; message: string },
    Error,
    z.infer<typeof addEmployeSchema>
  >({
    mutationKey: ['register'],
    mutationFn: async (values: z.infer<typeof addEmployeSchema>) => {
      const res = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          roleId: Number(values.roleId),
        }),
      })

      refetch()
      return await res.json()
    },

    onError: () => {
      toast('Une erreur est survenue')
    },

    onSuccess: () => {
      toast('Utilisateur créé')
    },
  })

  return { mutate }
}
