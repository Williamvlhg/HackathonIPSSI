import { Badge } from '@/components/ui/badge'
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
import { updateEmploye } from '@/services/employe.service'
import { getSkills } from '@/services/skill.service'
import { Role } from '@/types/role'
import { Skill } from '@/types/skill'
import { User } from '@/types/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FC, JSX, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { updateEmployeSchema } from './update-employe.schema'

interface IUpdateEmployeProps {
  currentUser: User
}

const UpdateEmploye: FC<IUpdateEmployeProps> = ({ currentUser }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  // state pour récupérer et modifier les compétences
  const [competences, setCompetences] = useState<Skill[]>(currentUser.worker?.skills || [])

  const { data: skills } = getSkills()

  const { data } = useQuery<{ success: boolean; data: Role[] }>({
    queryKey: ['getRoles'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/role/all')
      return await res.json()
    },
  })

  const { mutate } = updateEmploye(currentUser.id, currentUser.worker?.id)

  const form = useForm<z.infer<typeof updateEmployeSchema>>({
    resolver: zodResolver(updateEmployeSchema),
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      roleId: currentUser.role.id.toString(),
      skills: competences,
    },
  })

  function onChangeSkill(value: { id: number; label: string }) {
    setCompetences((curr) => {
      if (curr!.some((skill) => skill.id !== value.id)) {
        return [...curr!, value]
      }

      return [...curr!, value]
    })
  }

  function removeSkill(id: number) {
    setCompetences((curr) => curr!.filter((skill) => skill.id !== id))
  }

  function onSubmit(values: z.infer<typeof updateEmployeSchema>) {
    startTransition(() => {
      // si c'est un worker on lui passe le nouveau tableau de skills
      if (currentUser.worker?.id) {
        mutate({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          roleId: values.roleId,
          skills: competences!,
        })

        // si c'est dans le else alors ce n'est pas un worker
      } else {
        mutate(values)
      }

      setIsOpen(false)
    })
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className={buttonVariants()}>Modifier</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modification de {currentUser.firstName}</DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 mt-8 w-full'>
              <div className='flex w-full space-x-2'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input placeholder='John' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder='Doe' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='john.doe@gmail.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='roleId'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Choisir un role' />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.data.map((role, key) => (
                            <SelectItem key={key} value={String(role.id)}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* On affiche les compétences si le user est un worker */}
              {currentUser.worker && (
                <div>
                  <FormField
                    control={form.control}
                    name='skills'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Compétences</FormLabel>
                        <FormControl>
                          {/* @ts-expect-error - noramlement je ne peux passer qu'un string */}
                          <Select {...field} onValueChange={onChangeSkill}>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Compétences' />
                            </SelectTrigger>
                            <SelectContent>
                              {skills?.data.map((skill, key) => (
                                // @ts-expect-error - noramlement je ne peux passer qu'un string
                                <SelectItem key={key} value={skill}>
                                  {skill.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {competences!.length > 0 && (
                    <div className='border rounded-md p-2 mt-2 flex gap-1 items-center'>
                      {competences?.map((item) => (
                        <Badge
                          key={item.id}
                          onClick={() => removeSkill(item.id)}
                          className='cursor-pointer'
                        >
                          {item.label}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}

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

export default UpdateEmploye
