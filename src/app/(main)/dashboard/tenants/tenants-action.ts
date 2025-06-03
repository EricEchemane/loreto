'use server'

import { prisma } from '@/common/configs/prisma'
import { TenantStatus } from '@/common/enums/enums.db'
import { revalidatePath } from 'next/cache'

export async function getTenants() {
  return await prisma.tenant.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function addNewTenant(input: TNewTenant) {
  const added = await prisma.tenant.create({
    data: { ...input, moveInDate: new Date(input.moveInDate) },
  })
  if (added) {
    revalidatePath('/dashboard/tenants')
    return true
  }
  return false
}

export async function updateTenantStatus(params: {
  tenantId: number
  status: TenantStatus
}) {
  await prisma.tenant.update({
    where: { id: params.tenantId },
    data: {
      status: params.status,
    },
  })
  revalidatePath('/dashboard/tenants')
}

// Types
export type TGetTenants = Awaited<ReturnType<typeof getTenants>>
export type TNewTenant = {
  firstName: string
  lastName: string
  contactNumber: string
  moveInDate: string
  monthlyDueDate: number
  monthlyPayment: number
}
