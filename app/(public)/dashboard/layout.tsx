import { Button } from '@/components/ui/button'
import { ExitIcon } from '@radix-ui/react-icons'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import SignOutButton from '../SignOutButton'

export default async function DashboardPage(props: { children: ReactNode }) {
  const session = await getServerSession()

  if (!session?.user) {
    redirect('/signin')
  }

  const user = session.user

  return (
    <div className='max-w-4xl m-auto'>
      <nav className='sticky top-0 p-3 flex items-center'>
        <div className='flex items-center gap-2'>
          <Image
            className='rounded-full'
            src={user.image ?? ''}
            alt=''
            width={50}
            height={50}
          />
          <div>
            <div className='font-medium capitalize'>{user.name}</div>
            <div className='text-muted-foreground text-sm'>{user.email}</div>
          </div>
        </div>

        <div className='ml-auto'>
          <SignOutButton />
        </div>
      </nav>

      <div className='p-3 pt-0 flex items-centerx'>
        <Button variant={'ghost'}>Dashboard</Button>
        <Button variant={'ghost'}>Cart</Button>
        <Button variant={'ghost'}>Orders</Button>
        <Button variant={'ghost'}>Transactions</Button>
        <Button
          variant={'default'}
          className='ml-auto'
        >
          Custom Box
        </Button>
      </div>

      <main>{props.children}</main>
    </div>
  )
}
