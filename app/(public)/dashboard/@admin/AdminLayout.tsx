import { ReactNode } from 'react'
import { UserRole } from '@/common/enums/enums.db'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { UserRoleLabel } from '@/common/constants/business'
import MaterialIcon from '@/components/ui/material-icon'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/common/configs/auth'
import { redirect } from 'next/navigation'
import SignoutButton from '../SignoutButton'
import { ThemeSwitcher } from '../ThemeSwitcher'

export default async function AdminLayout(props: { children: ReactNode }) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user) {
    redirect('/')
  }

  return (
    <main className='grid grid-cols-[auto_1fr]'>
      <aside className='sticky top-0 h-screen border-r'>
        <div className='flex items-center gap-2 p-4'>
          <Avatar>
            <AvatarImage
              src={user.image ?? ''}
              alt={user.name}
            />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className='text-sm font-medium capitalize'>{user.name}</div>
            <div className='text-xs text-muted-foreground'>{user.email}</div>
          </div>
          <Badge
            variant={'secondary'}
            className='ml-2 capitalize'
          >
            {UserRoleLabel[user.role as UserRole]}
          </Badge>
        </div>

        <nav className='flex flex-col gap-1'>
          <Link href={'/dashboard'}>
            <Button
              variant={'ghost'}
              className='w-full justify-start'
            >
              <MaterialIcon
                name='dashboard'
                className='mr-2'
              />
              Dashboard
            </Button>
          </Link>

          <Link href={'/dashboard/apartments'}>
            <Button
              variant={'ghost'}
              className='w-full justify-start'
            >
              <MaterialIcon
                name='other_houses'
                className='mr-2'
              />
              Apartments
            </Button>
          </Link>

          <Link href={'/dashboard/auditlogs'}>
            <Button
              variant={'ghost'}
              className='w-full justify-start'
            >
              <MaterialIcon
                name='person_edit'
                className='mr-2'
              />
              Audit Logs
            </Button>
          </Link>

          <Link href={'/box'}>
            <Button
              variant={'ghost'}
              className='w-full justify-start'
            >
              <MaterialIcon
                name='package_2'
                className='mr-2'
              />
              Box Packaging
            </Button>
          </Link>

          <Link href={'/dashboard/accounts'}>
            <Button
              variant={'ghost'}
              className='w-full justify-start'
            >
              <MaterialIcon
                name='manage_accounts'
                className='mr-2'
              />
              Manage Accounts
            </Button>
          </Link>

          <Link href={'/dashboard/orders'}>
            <Button
              variant={'ghost'}
              className='w-full justify-start'
            >
              <MaterialIcon
                name='orders'
                className='mr-2'
              />
              Orders
            </Button>
          </Link>

          <Link href={'/dashboard/transactions'}>
            <Button
              variant={'ghost'}
              className='w-full justify-start'
            >
              <MaterialIcon
                name='receipt_long'
                className='mr-2'
              />
              Transactions
            </Button>
          </Link>

          <Link href={'/dashboard/vehicles'}>
            <Button
              variant={'ghost'}
              className='w-full justify-start'
            >
              <MaterialIcon
                name='local_shipping'
                className='mr-2'
              />
              Vehicles
            </Button>
          </Link>
        </nav>

        <div className='flex items-center justify-between absolute bottom-0 right-0 left-0 p-4'>
          <div className='text-muted-foreground text-sm'>Settings</div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={'ghost'}
                size={'icon'}
              >
                <MaterialIcon name='settings' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <SignoutButton />
              <ThemeSwitcher />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {props.children}
    </main>
  )
}
