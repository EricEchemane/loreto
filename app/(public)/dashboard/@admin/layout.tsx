import { ReactNode } from 'react'

import AdminLayout from './AdminLayout'

export default function AdminDashboardRootLayout(props: {
  children: ReactNode
}) {
  return <AdminLayout>{props.children}</AdminLayout>
}
