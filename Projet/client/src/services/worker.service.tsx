/* eslint-disable react-hooks/rules-of-hooks */

import { updateWorkerSchema } from '@/features/workers/update-worker.schema'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

export function updateWorker() {
  const { mutate } = useMutation({
    mutationKey: ['updateWorker'],
    mutationFn: async (values: z.infer<typeof updateWorkerSchema>) => {
      const resUpdateWorker = await fetch(`http://localhost:8080/worker/${values.workerId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          skills: values.skills,
        }),
      })

      return await resUpdateWorker.json()
    },
  })

  return { mutate }
}
