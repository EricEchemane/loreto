'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Vehicle } from '@prisma/client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function VehicleDetails({ data }: { data: Vehicle }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const readOnly = searchParams.get('action') !== 'edit'

  const startEditing = () => {
    router.push(`${pathname}?action=edit`)
  }
  const discard = () => {
    router.push(pathname)
  }

  return (
    <div className='bg-neutral-50'>
      <header className='p-4 flex items-center gap-2 justify-between'>
        <h3 className='capitalize'>Vehicle Details</h3>

        <div className={cn({ hidden: readOnly }, 'space-x-3')}>
          <Button disabled>Save</Button>
          <Button
            onClick={discard}
            variant={'outline'}
          >
            Discard
          </Button>
        </div>

        <Button
          className={cn({ hidden: !readOnly })}
          onClick={startEditing}
        >
          Edit
        </Button>
      </header>

      <div className='grid grid-cols-12 p-4 gap-4'>
        <Card className='col-span-6'>
          <CardHeader>
            <CardTitle className='text-base'>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-1'>
              <Label htmlFor='vehicle_name'>Vehicle Name</Label>
              <Input
                ref={(ref) => !readOnly && ref?.focus()}
                id='vehicle_name'
                defaultValue={data.name}
                name='name'
                readOnly={readOnly}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='model'>Model</Label>
              <Input
                id='model'
                defaultValue={data.model}
                name='model'
                readOnly={readOnly}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='plateNumber'>Plate Number</Label>
              <Input
                id='plateNumber'
                defaultValue={data.plateNumber}
                name='plateNumber'
                readOnly={readOnly}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
