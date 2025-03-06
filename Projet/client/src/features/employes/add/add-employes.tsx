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
import { addEmploye, getEmployes } from '@/services/employe.service'
import { Role } from '@/types/role'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { FC, JSX, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { addEmployeSchema } from './add-employe.schema'

const AddEmploye: FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate } = addEmploye()
  const [isPending, startTransition] = useTransition()

  const { data } = useQuery<{ success: boolean; data: Role[] }>({
    queryKey: ['getRoles'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/role/all')
      return await res.json()
    },
  })

  const form = useForm<z.infer<typeof addEmployeSchema>>({
    resolver: zodResolver(addEmployeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleId: '',
    },
  })

  const { data: employesData } = getEmployes()

  function onSubmit(values: z.infer<typeof addEmployeSchema>) {
    startTransition(() => {
      mutate(values)
      setIsOpen(false)
    })
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger className={buttonVariants()}>Ajouter un employé</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvel employé</DialogTitle>

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
                name='password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input placeholder='********' {...field} type='password' />
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
                          {!employesData?.data.length && <SelectItem value={'1'}>admin</SelectItem>}
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

export default AddEmploye
