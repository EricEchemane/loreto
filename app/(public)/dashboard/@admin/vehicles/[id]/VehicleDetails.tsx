'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { VehicleStatusLabel } from '@/common/constants/business'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import Link from 'next/link'
import StatusWithDot from '@/components/shared/StatusWithDot'
import { VehicleStatusColor } from '@/common/constants/status-colors'
import { VehicleStatus } from '@/common/enums/enums.db'
import ImageUpload from '@/components/shared/ImageUpload'

import { useForm, SubmitHandler } from "react-hook-form"
import { Vehicle } from '@prisma/client'
import { format } from 'date-fns'
import { updateVehicleAction } from './vehicle-detail-actions'
import { useState } from 'react'

export type UpdateVehicleInput = Partial<Omit<Vehicle, 'lastMaintenance' | 'purchaseDate' | 'photoUrl'> & {
  lastMaintenance: string | undefined
  purchaseDate: string | undefined
  photoUrl: string | undefined
}>

export default function VehicleDetails({ data }: { data: Vehicle }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const readOnly = searchParams.get('action') !== 'edit'
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<Partial<UpdateVehicleInput>>({
    defaultValues: {
      ...data,
      lastMaintenance: data.lastMaintenance ? format(data.lastMaintenance, 'yyyy-MM-dd') : undefined,
      purchaseDate: data.purchaseDate ? format(data.purchaseDate, 'yyyy-MM-dd') : undefined,
    },
    disabled: isSaving,
  })

  const discard = () => {
    router.replace(pathname)
    form.reset()
  }

  const onSubmit: SubmitHandler<UpdateVehicleInput> = async (data) => {
    // console.log(data)
    setIsSaving(true)

    try {
      const res = await updateVehicleAction(data)
      console.log(res)
      if (res.status === 201) { }
      // if the photo changed, upload the new photo to cloudinary
      // if the photo is a string, it means the photo was not changed
      // if the upload is successful, update the vehicle with the new photo url
      // save the vehicle to the database with the new photo url
      // if saved successfully, delete the old photo from cloudinary
      // else delte the new uploaded photo from cloudinary
    } catch (error) {
      console.error(error)
    } finally {
      setIsSaving(false)
    }

  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='bg-neutral-50 dark:bg-neutral-900'>

      <header className='p-4 flex items-center gap-2 justify-between'>
        <div className='flex items-center gap-2'>
          <Button
            onClick={() => router.back()}
            variant={'ghost'}
            size={'icon'}
            type='button'
            disabled={isSaving}
          >
            <ArrowLeftIcon />
          </Button>
          <h3 className='capitalize'>Vehicle Details</h3>
        </div>

        <div className={cn({ hidden: readOnly }, 'space-x-3')}>
          <Button disabled={form.formState.isDirty == false || isSaving}>
            Save
          </Button>

          <Button
            type='button'
            onClick={discard}
            variant={'outline'}
          >
            Discard
          </Button>
        </div>

        <Link href={`/dashboard/vehicles/${data.id}?action=edit`} className={cn({ hidden: !readOnly })}>
          <Button type='button' disabled={isSaving}>
            Edit
          </Button>
        </Link>
      </header>

      <div className='grid grid-cols-12 p-4 gap-4 w-[850px] m-auto'>
        <div className='col-span-7 space-y-4'>
          <Card className='shadow-none'>
            <CardHeader>
              <CardTitle className='text-base'>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-1'>
                <Label
                  htmlFor='vehicle_name'
                  className='small'
                >
                  Vehicle Name
                </Label>
                <Input
                  id='vehicle_name'
                  readOnly={readOnly}
                  {...form.register('name')}
                  defaultValue={data.name}
                  ref={(ref) => !readOnly && ref?.focus()}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='model'>Model</Label>
                <Input
                  id='model'
                  defaultValue={data.model}
                  {...form.register('model')}
                  readOnly={readOnly}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='plateNumber'>Plate Number</Label>
                <Input
                  id='plateNumber'
                  defaultValue={data.plateNumber}
                  {...form.register('plateNumber')}
                  readOnly={readOnly}
                />
              </div>
            </CardContent>
          </Card>

          <Card className='shadow-none'>
            <CardHeader>
              <CardTitle className='text-base'>History</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-2 place-items-start gap-4'>
              <div className='space-y-1'>
                <Label htmlFor='lastMaintenance'>Last Maintenance</Label>
                <Input
                  type='date'
                  placeholder='Last maintenance'
                  {...form.register('lastMaintenance')}
                  readOnly={readOnly}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='purchaseDate'>Purchased On</Label>
                <Input
                  type='date'
                  id='purchaseDate'
                  {...form.register('purchaseDate')}
                  readOnly={readOnly}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='col-span-5 space-y-4'>
          <div className='mt-1'>
            <ImageUpload
              disabled={isSaving}
              hidden={readOnly}
              initialImageSrc={data.photoUrl}
              onImageChange={function({ imageSrc }): void {
                form.setValue('photoUrl', imageSrc, { shouldDirty: true })
              }}
              inputName={'photoUrl'} />
          </div>

          <Card className='shadow-none p-5'>
            <div className='space-y-1'>
              <Label>Status</Label>
              <Select
                defaultValue={data.status.toString()}
                disabled={readOnly || isSaving}
                onValueChange={(value) => form.setValue('status', +value, { shouldDirty: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(VehicleStatusLabel).map(([key, value]) => (
                    <SelectItem
                      key={key}
                      value={key}
                    >
                      <StatusWithDot label={value} color={VehicleStatusColor[+key as VehicleStatus]} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>
      </div>
    </form>
  )
}
