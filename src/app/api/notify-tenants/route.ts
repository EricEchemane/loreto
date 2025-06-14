import { prisma } from '@/common/configs/prisma'

export const revalidate = 10

export async function GET(req: Request) {
  const activeTenants = await prisma.tenant.findMany({
    where: {
      status: 0,
    },
  })

  const dateToday = new Date().getDate()
  activeTenants.forEach((tenant) => {
    const isTwoDaysBeforeDue = tenant.monthlyDueDate - dateToday === 2
  })

  return Response.json({
    message: 'Notifiy tenants API route.',
    dateToday,
    activeTenants,
  })
}
