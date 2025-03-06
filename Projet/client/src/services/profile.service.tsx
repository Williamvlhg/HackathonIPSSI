/* eslint-disable react-hooks/rules-of-hooks */

import { updateProfileSchema } from '@/features/profile/update-profile.schema'
import { useMutation } from '@tanstack/react-query'
import bcrypt from 'bcryptjs'
import { toast } from 'sonner'
import { z } from 'zod'

export function updateProfile() {
  const { data, mutate } = useMutation<
    { success: boolean; message: string },
    Error,
    z.infer<typeof updateProfileSchema>
  >({
    mutationKey: ['updateProfile'],
    mutationFn: async (values: z.infer<typeof updateProfileSchema>) => {
      const res = await fetch(`http://localhost:8080/user/profile/${values.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          id: values.id,
          email: values.email,
          password: await bcrypt.hash(values.password, 10),
        }),
      })

      return await res.json()
    },

    onError: (data) => {
      toast(data.message)
    },

    onSuccess: (data) => {
      toast(data.message)
    },
  })

  return { data, mutate }
}
