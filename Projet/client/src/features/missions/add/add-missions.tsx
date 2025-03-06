import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { addMission } from '@/services/mission.service'
import { Site } from '@/types/site'
import { WorkerType } from '@/types/worker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FC, JSX, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { missionSchema } from './add-mission.schema'
import { format } from 'date-fns'

const AddMission: FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate } = addMission()
  const [isPending, startTransition] = useTransition()

  // Fetch all sites
  const { data: sitesData, refetch: refetchSites } = useQuery<{ success: boolean; data: Site[] }>({
    queryKey: ['getSite'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/site/all')
      return res.json()
    },
  })

  // Fetch all workers
  const { data: workersData } = useQuery<{ success: boolean; data: WorkerType[] }>({
    queryKey: ['getWorker'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/worker/all')
      return res.json()
    },
  })

  const form = useForm<z.infer<typeof missionSchema>>({
    resolver: zodResolver(missionSchema),
    defaultValues: {
      title: '',
      startDate: '',
      endDate: '',
      workerId: undefined,
      siteId: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof missionSchema>) {
    startTransition(() => {
      // Format dates to "yyyy-MM-dd"
      const formattedStartDate = format(new Date(values.startDate), 'yyyy-MM-dd')
      const formattedEndDate = format(new Date(values.endDate), 'yyyy-MM-dd')
      mutate(
        { ...values, startDate: formattedStartDate, endDate: formattedEndDate },
        {
          onSuccess: () => {
            refetchSites()
            form.reset()
            setIsOpen(false)
          },
        }
      )
    })
  }
  console.log(workersData)
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className={buttonVariants()}>Ajouter une mission</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle mission</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8 w-full'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Titre de la mission</FormLabel>
                    <FormControl>
                      <Input placeholder='Polissage de la maison...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Date de début</FormLabel>
                    <FormControl>
                      <Input placeholder='03/03/2025' {...field} pattern='\d{2}/\d{2}/\d{4}' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Date de fin</FormLabel>
                    <FormControl>
                      <Input placeholder='07/03/2025' {...field} pattern='\d{2}/\d{2}/\d{4}' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='siteId'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Site</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value ? String(field.value) : ''}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Choisir un site' />
                        </SelectTrigger>
                        <SelectContent>
                          {sitesData?.data.map((site) => (
                            <SelectItem key={site.id} value={String(site.id)}>
                              {site.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='workerId'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Employé</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value ? String(field.value) : ''}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Choisir un ouvrier' />
                        </SelectTrigger>
                        <SelectContent>
                          {workersData?.data.map((worker) => (
                            <SelectItem key={worker.id} value={String(worker.id)}>
                              {worker.user?.[0]?.firstName || 'N/A'} #{worker.id} -{' '}
                              {worker.skills.length > 0
                                ? worker.skills.map((s) => s.label).join(', ')
                                : 'Aucune compétence'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full'>
                {isPending ? 'loading' : 'Ajouter'}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddMission
