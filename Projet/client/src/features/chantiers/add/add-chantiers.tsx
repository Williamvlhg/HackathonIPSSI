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
import { addSite } from '@/services/chantier.service'
import { Skill } from '@/types/skill'
import { WorkerType } from '@/types/worker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FC, JSX, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { addSiteSchema } from './add-chantier.schema'
import { format } from 'date-fns'

const AddSite: FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate } = addSite()
  const [isPending, startTransition] = useTransition()

  const { data, refetch } = useQuery<{ success: boolean; data: Skill[] }>({
    queryKey: ['getSkill'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/skill/all')
      return await res.json()
    },
  })

  const { data: workersData } = useQuery<{ success: boolean; data: WorkerType[] }>({
    queryKey: ['getWorker'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/worker/all')
      return await res.json()
    },
  })

  const form = useForm<z.infer<typeof addSiteSchema>>({
    resolver: zodResolver(addSiteSchema),
    defaultValues: {
      name: '',
      address: '',
      startDate: '',
      endDate: '',
      skills: [],
      workers: [],
    },
  })

  function onSubmit(values: z.infer<typeof addSiteSchema>) {
    startTransition(() => {
      const formattedEndDate = format(new Date(values.endDate), 'yyyy-MM-dd')
      const formattedStartDate = format(new Date(values.startDate), 'yyyy-MM-dd')
      mutate(
        { ...values, endDate: formattedEndDate, startDate: formattedStartDate },
        {
          onSuccess: () => {
            refetch()
            form.reset()
            setIsOpen(false)
          },
        }
      
      )
    })
  }


  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className={buttonVariants()}>Ajouter un Chantier</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouveau chantier</DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8 w-full'>
              <div className='flex w-full space-x-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Nom du chantier</FormLabel>
                      <FormControl>
                        <Input placeholder='Magasin, Bureau...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Adresse</FormLabel>
                      <FormControl>
                        <Input placeholder='1 Rue Hackathon, 75000 Paris' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Date de début</FormLabel>
                    <FormControl>
                      <Input placeholder='03/03/2025'  {...field} 
                      pattern='\d{2}/\d{2}/\d{4}'
                      />
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
                      <Input placeholder='07/03/2025' {...field} 
                      pattern='\d{2}/\d{2}/\d{4}'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='skills'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Compétences</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(selectedSkillId) => {
                          const selectedSkill = data?.data.find(
                            (skill) => String(skill.id) === selectedSkillId
                          )
                          if (!selectedSkill) return

                          const alreadySelected = field.value.some(
                            (skill) => skill.id === selectedSkill.id
                          )

                          if (alreadySelected) {
                            field.onChange(
                              field.value.filter((skill) => skill.id !== selectedSkill.id)
                            )
                          } else {
                            field.onChange([...field.value, selectedSkill])
                          }
                        }}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Choisir une ou plusieurs compétences' />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.data.map((skill) => (
                            <SelectItem key={skill.id} value={String(skill.id)}>
                              {skill.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <div className='mt-2 flex flex-wrap gap-2'>
                      {field.value.map((skill) => (
                        <div
                          key={skill.id}
                          className='bg-gray-200 px-2 py-1 rounded flex items-center'
                        >
                          {skill.label}
                          <button
                            type='button'
                            className='ml-2 text-red-500'
                            onClick={() =>
                              field.onChange(field.value.filter((s) => s.id !== skill.id))
                            }
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='workers'
                render={({ field }) => {
                  const selectedSkillIds = form.watch('skills')?.map((skill) => skill.id) || []
                  const filteredWorkers =
                    workersData?.data.filter((worker) =>
                      worker.skills.some((skill) => selectedSkillIds.includes(skill.id))
                    ) || []

                  return (
                    <FormItem className='w-full'>
                      <FormLabel>Employés</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(selectedWorkerId) => {
                            const selectedWorker = filteredWorkers.find(
                              (worker) => String(worker.id) === selectedWorkerId
                            )
                            if (!selectedWorker) return

                            const alreadySelected = field.value.some(
                              (worker) => worker.id === selectedWorker.id
                            )

                            if (alreadySelected) {
                              field.onChange(
                                field.value.filter((worker) => worker.id !== selectedWorker.id)
                              )
                            } else {
                              field.onChange([...field.value, { id: selectedWorker.id }])
                            }
                          }}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Choisir un ou plusieurs employés' />
                          </SelectTrigger>

                          <SelectContent>
                            {filteredWorkers.map((worker) => (
                              <SelectItem key={worker.id} value={String(worker.id)}>
                                {worker.user[0].firstName} #{worker.id} -{' '}
                                {worker.skills.length > 0
                                  ? worker.skills.map((s) => s.label).join(', ')
                                  : 'Aucune compétence'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <div className='mt-2 flex flex-wrap gap-2'>
                        {field.value.map((worker) => {
                          const workerInfo = workersData?.data.find((w) => w.id === worker.id)
                          return (
                            workerInfo && (
                              <div
                                key={worker.id}
                                className='bg-blue-200 px-2 py-1 rounded flex items-center'
                              >
                                Worker #{worker.id} -{' '}
                                {workerInfo.skills.length > 0
                                  ? workerInfo.skills.map((s) => s.label).join(', ')
                                  : 'Aucune compétence'}
                                <button
                                  type='button'
                                  className='ml-2 text-red-500'
                                  onClick={() =>
                                    field.onChange(field.value.filter((w) => w.id !== worker.id))
                                  }
                                >
                                  ✕
                                </button>
                              </div>
                            )
                          )
                        })}
                      </div>

                      <FormMessage />
                    </FormItem>
                  )
                }}
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

export default AddSite
