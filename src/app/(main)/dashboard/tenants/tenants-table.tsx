'use client'

import { DataTable } from '@/components/shared/DataTable'
import { TGetTenants } from './tenants-action'

interface Props {
  tenants: TGetTenants
}

export default function TenantsTable(props: Props) {
  return (
    <DataTable
      data={[]}
      columns={[]}
    />
  )
}
