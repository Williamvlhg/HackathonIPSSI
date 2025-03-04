import { Role } from '@/types/role'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, JSX } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button, buttonVariants } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  roleId: z.string(),
})

const AddEmploye: FC = (): JSX.Element => {
  const { data } = useQuery<{ success: boolean; data: Role[] }>({
    queryKey: ['getRoles'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/role/all')
      return await res.json()
    },
  })

  const { mutate, data: mutationData } = useMutation<
    { success: boolean; message: string },
    Error,
    z.infer<typeof formSchema>
  >({
    mutationKey: ['register'],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
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

      form.reset()
      return await res.json()
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleId: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  return (
    <Dialog>
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
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full'>
                Enregistré
              </Button>
            </form>
          </Form>

          {mutationData &&
            (mutationData.success === false ? (
              <div className='bg-red-200 rounded-md p-2'>
                <p className='text-red-600 text-center'>{mutationData.message}</p>
              </div>
            ) : (
              <div className='bg-green-200 rounded-md p-2'>
                <p className='text-green-600 text-center'>{mutationData?.message}</p>
              </div>
            ))}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AddEmploye
