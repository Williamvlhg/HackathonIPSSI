import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.string(),
});

const passwordSchema = z.object({
  password: z.string(),
});

export const Route = createFileRoute('/profile')({
  component: Profile,
});

const userData = {
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  role: 'Chef de chantier',
};

const validatedUser = userSchema.parse(userData);

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof passwordSchema>) {
    console.log("Nouveau mot de passe:", values.password);
    setIsEditing(false);
  }

  return (
    <div className="flex justify-center items-center h-screen pl-10">
      <Card className='w-128 rounded-lg bg-white p-5'>
        <CardHeader>
          <CardTitle className='text-xl font-bold text-center text-gray-900'>
            Profil de l'utilisateur
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-5'>
          <p className='text-gray-700'><strong className='font-medium'>Nom :</strong> {validatedUser.name}</p>
          <p className='text-gray-700'><strong className='font-medium'>Email :</strong> {validatedUser.email}</p>
          <p className='text-gray-700'><strong className='font-medium'>Rôle :</strong> {validatedUser.role}</p>

          {!isEditing ? (
            <Button className='w-full mt-5' onClick={() => setIsEditing(true)}>
              Modifier le mot de passe
            </Button>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nouveau mot de passe</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder='********' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <Button type="submit">Enregistrer</Button>
                  <Button variant='outline' onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
