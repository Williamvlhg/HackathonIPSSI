import { Badge } from '@/components/ui/badge'
import UpdateProfile from '@/features/profile/update-profile'
import { getEmploye } from '@/services/employe.service'
import { createFileRoute } from '@tanstack/react-router'
import { useCookies } from 'react-cookie'

export const Route = createFileRoute('/profile')({
  component: Profile,
})

function Profile() {
  const [cookie] = useCookies(['user'])
  const { data } = getEmploye(cookie.user.id)

  if (!data) {
    return <></>
  }

  return (
    <>
      <section className='space-y-2'>
        <h2 className='text-4xl'>
          {data.data.firstName} {data.data.lastName}
        </h2>
        <Badge className='uppercase'>{data?.data.role.label}</Badge>
      </section>

      <hr className='my-8' />

      <section>
        <article className='flex items-center space-x-4'>
          <h2 className='text-2xl'>Vos informations</h2>
          <UpdateProfile user={{ id: data.data.id, email: data.data.email, password: '' }} />
        </article>
        <article className='mt-6 space-x-2 grid grid-cols-[.1fr_1fr] gap-4'>
          <p>Email</p>
          <p>{data?.data.email}</p>
          <p>Mot de passe</p>
          <p>*********</p>
        </article>
      </section>

      <hr className='my-8' />

      <section>
        <h2 className='text-2xl'>Compétences</h2>
        <article className='mt-4 px-6 py-3 rounded-2xl border space-x-2'>
          <Badge>PHP</Badge>
          <Badge>PHP</Badge>
          <Badge>PHP</Badge>
        </article>
      </section>
    </>
  )
}

export default Profile
