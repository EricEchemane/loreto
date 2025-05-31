'use server'

import { prisma } from '@/common/configs/prisma'

export async function getTenants() {
  return await prisma.tenant.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function addNewTenant() {}

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
