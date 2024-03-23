import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { authOptions } from '@/common/configs/auth'
import { UserRole } from '@/common/enums/enums.db'

export default async function DashboardPage(props: {
  children: ReactNode
  admin: ReactNode
  staff: ReactNode
  customer: ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/signin')
  }

  const PageMap: Record<UserRole, ReactNode> = {
    [UserRole.Admin]: props.admin,
    [UserRole.Staff]: props.staff,
    [UserRole.Customer]: props.customer,
  }

  return PageMap[session.user.role as UserRole]
}
