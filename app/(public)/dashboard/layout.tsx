import { Button } from '@/components/ui/button'

import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import SignOutButton from '../SignOutButton'
import Link from 'next/link'
import { authOptions } from '@/common/configs/auth'

export default async function DashboardPage(props: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/signin')
  }

  const user = session.user

  return (
    <div className='max-w-4xl m-auto'>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <nav className='sticky top-0 p-3 flex items-center'>
        <div className='flex items-center gap-2'>
          <Image
            className='rounded-full'
            src={user.image ?? ''}
            alt=''
            width={36}
            height={36}
          />
          <div>
            <div className='font-bold capitalize text-sm'>{user.name}</div>
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
        <Link
          href={'/box'}
          className='ml-auto'
        >
          <Button variant={'default'}>Custom Box</Button>
        </Link>
      </div>

      <main>{props.children}</main>
    </div>
  )
}
