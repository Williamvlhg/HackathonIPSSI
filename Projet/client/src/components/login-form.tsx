import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'

import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { isPending, mutate, data } = useMutation<
    { success: boolean; message: string },
    Error,
    z.infer<typeof formSchema>
  >({
    mutationKey: ['login'],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      return await res.json()
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Connectez-vous à votre compte</CardTitle>
          <CardDescription>Entrez votre mail pour vous connectez</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='m@exemple.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='password'>Mot de passe</FormLabel>
                    <FormControl>
                      <Input placeholder='********' {...field} type='password' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full'>
                  {isPending ? 'loading' : 'Se connecter'}
                </Button>
              </div>
              {data?.success === false && (
                <div className='bg-red-200 rounded-md p-2'>
                  <p className='text-red-600 text-center'>{data?.message}</p>
                </div>
              )}
              <div className='mt-4 text-center text-sm'>
                Identifiant oublié ou mot de passe oublié ?{' '}
                <a href='#' className='underline underline-offset-4'>
                  Contactez un administrateur
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
