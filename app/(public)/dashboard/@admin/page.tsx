import AdminLayout from './AdminLayout'
import PageUnderConstruction from '@/components/shared/PageUnderConstruction'

export default function AdminPage() {
  return (
    <AdminLayout>
      <PageUnderConstruction pageName='Dashboard Page' />
    </AdminLayout>
  )
}
