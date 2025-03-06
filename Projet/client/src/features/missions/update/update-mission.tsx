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
import { updateMission } from '@/services/mission.service'
import { Mission } from '@/types/mission'
import { Site } from '@/types/site'
import { WorkerType } from '@/types/worker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FC, JSX, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { missionSchema } from './update-mission.schema'

interface IUpdateMissionProps {
  currentMission: Mission
}

const UpdateMission: FC<IUpdateMissionProps> = ({ currentMission }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Fetch all sites for selection
  const { data: sitesData } = useQuery<{ success: boolean; data: Site[] }>({
    queryKey: ['getSites'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/site/all')
      return res.json()
    },
  })

  // Fetch all workers for selection
  const { data: workersData } = useQuery<{ success: boolean; data: WorkerType[] }>({
    queryKey: ['getWorkers'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/worker/all')
      return res.json()
    },
  })

  const { mutate } = updateMission(currentMission.id)

  const form = useForm<z.infer<typeof missionSchema>>({
    resolver: zodResolver(missionSchema),
    defaultValues: {
      title: currentMission.title,
      startDate: currentMission.startDate,
      endDate: currentMission.endDate,
      workerId: currentMission.workerId,
      siteId: currentMission.siteId,
    },
  })

  function onSubmit(values: z.infer<typeof missionSchema>) {
    startTransition(() => {
      mutate(values)
      setIsOpen(false)
    })
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className={buttonVariants()}>Modifier</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modification de la mission : {currentMission.title}</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8 w-full">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Titre de la mission</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre de la mission" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full space-x-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Date de début</FormLabel>
                      <FormControl>
                        <Input placeholder="03/03/2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Date de fin</FormLabel>
                      <FormControl>
                        <Input placeholder="07/03/2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="siteId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Site</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value ? String(field.value) : ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisir un site" />
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
                name="workerId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Employé</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value ? String(field.value) : ""}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisir un employé" />
                        </SelectTrigger>
                        <SelectContent>
                          {workersData?.data.map((worker) => (
                            <SelectItem key={worker.id} value={String(worker.id)}>
                              {worker.user?.[0]?.firstName || "N/A"} #{worker.id} -{" "}
                              {worker.skills.length > 0
                                ? worker.skills.map((s) => s.label).join(", ")
                                : "Aucune compétence"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {isPending ? "loading" : "Enregistrer"}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateMission
