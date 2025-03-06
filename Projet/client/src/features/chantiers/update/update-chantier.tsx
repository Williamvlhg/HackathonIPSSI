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
import { updateSite } from '@/services/chantier.service'
import { Site } from '@/types/site'
import { Skill } from '@/types/skill'
import { WorkerType } from '@/types/worker'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FC, JSX, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateSiteSchema } from './update-chantier.schema'

interface IUpdateSiteProps {
  currentSite: Site
}

const UpdateSite: FC<IUpdateSiteProps> = ({ currentSite }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const { data } = useQuery<{ success: boolean; data: Skill[] }>({
    queryKey: ['getSkills'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/skill/all')
      return await res.json()
    },
  })
    const { data: workersData } = useQuery<{ success: boolean; data: WorkerType[] }>({
        queryKey: ['getWorkers'],
        queryFn: async () => {
        const res = await fetch('http://localhost:8080/worker/all');
        return await res.json();
        },
    })

  const { mutate } = updateSite(currentSite.id)

  const form = useForm<z.infer<typeof updateSiteSchema>>({
    resolver: zodResolver(updateSiteSchema),
    defaultValues: {
      name: currentSite.name,
      address: currentSite.address,
      startDate: currentSite.startDate,
      endDate: currentSite.endDate,
      skills: Array.isArray(currentSite.skills) 
      ? currentSite.skills.map(skill => ({ 
        id: Number(skill.id), 
        label: String(skill.label),
     })) 
      : [],
      workers: Array.isArray(currentSite.workers) 
      ? currentSite.workers.map(worker => ({ 
        id: Number(worker.id)
      })) 
      : [],
    },
  })

  function onSubmit(values: z.infer<typeof updateSiteSchema>) {
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
          <DialogTitle>Modification de {currentSite.name}</DialogTitle>

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
                      <Input placeholder='03/03/2025' {...field} />
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
                      <Input placeholder='07/03/2025' {...field} />
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
                        const selectedSkill = data?.data.find(skill => String(skill.id) === selectedSkillId);
                        if (!selectedSkill) return;

                        const alreadySelected = field.value.some(skill => skill.id === selectedSkill.id);

                        if (alreadySelected) {
                        const updatedSkills = field.value.filter(skill => skill.id !== selectedSkill.id);
                        field.onChange(updatedSkills);

                        const selectedWorkers = form.watch('workers') || [];
                        const updatedWorkers = selectedWorkers.filter((worker) => {
                          const workerInfo = workersData?.data.find((w) => w.id === worker.id);
                          return (
                            workerInfo &&
                            workerInfo.skills.some((skill) =>
                              updatedSkills.some((s) => s.id === skill.id)
                            )
                          );
                        });
                        form.setValue('workers', updatedWorkers);
                        } else {
                        field.onChange([...field.value, selectedSkill]);
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
                    <div key={skill.id} className='bg-gray-200 px-2 py-1 rounded flex items-center'>
                        {skill.label}
                        <button
                        type='button'
                        className='ml-2 text-red-500'
                        onClick={() => {
                          const updatedSkills = field.value.filter(s => s.id !== skill.id);
                          field.onChange(updatedSkills);

                          const selectedWorkers = form.watch('workers') || [];
                          const updatedWorkers = selectedWorkers.filter((worker) => {
                            const workerInfo = workersData?.data.find((w) => w.id === worker.id);
                            return (
                              workerInfo &&
                              workerInfo.skills.some((skill) =>
                                updatedSkills.some((s) => s.id === skill.id)
                              )
                            );
                          });
                          form.setValue('workers', updatedWorkers);
                        }}
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
        name="workers"
        render={({ field }) => {
            const selectedSkillIds = form.watch("skills")?.map((skill) => skill.id) || [];
            const filteredWorkers =
            workersData?.data.filter((worker) =>
                worker.skills.some((skill) => selectedSkillIds.includes(skill.id))
            ) || [];

            return (
            <FormItem className="w-full">
                <FormLabel>Employés</FormLabel>
                <FormControl>
                <Select
                    onValueChange={(selectedWorkerId) => {
                    const selectedWorker = filteredWorkers.find(
                        (worker) => String(worker.id) === selectedWorkerId
                    );
                    if (!selectedWorker) return;

                    const alreadySelected = field.value.some(
                        (worker) => worker.id === selectedWorker.id
                    );

                    if (alreadySelected) {
                        field.onChange(
                        field.value.filter((worker) => worker.id !== selectedWorker.id)
                        );
                    } else {
                        field.onChange([...field.value, { id: selectedWorker.id }]);
                    }
                    }}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisir un ou plusieurs employés" />
                    </SelectTrigger>

                    <SelectContent>
                    {filteredWorkers.map((worker) => (
                        <SelectItem key={worker.id} value={String(worker.id)}>
                        {worker.user[0]?.firstName} {worker.user[0]?.lastName} #{worker.id} - Compétences :{" "}
                        {worker.skills.length > 0
                            ? worker.skills.map((s) => s.label).join(", ")
                            : "Aucune compétence"}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </FormControl>

                <div className="mt-2 flex flex-wrap gap-2">
                {field.value.map((worker) => {
                    const workerInfo = workersData?.data.find((w) => w.id === worker.id);
                    return (
                    workerInfo && (
                        <div key={worker.id} className="bg-blue-200 px-2 py-1 rounded flex items-center">
                        {workerInfo.user[0]?.firstName} {workerInfo.user[0]?.lastName} #{worker.id} -{" "}
                        {workerInfo.skills.length > 0
                            ? workerInfo.skills.map((s) => s.label).join(", ")
                            : "Aucune compétence"}
                        <button
                            type="button"
                            className="ml-2 text-red-500"
                            onClick={() =>
                            field.onChange(field.value.filter((w) => w.id !== worker.id))
                            }
                        >
                            ✕
                        </button>
                        </div>
                    )
                    );
                })}
                </div>

                <FormMessage />
            </FormItem>
            );
        }}
        />



              <Button type='submit' className='w-full'>
                {isPending ? 'loading' : 'Enregistré'}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateSite