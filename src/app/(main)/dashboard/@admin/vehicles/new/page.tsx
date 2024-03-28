'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import ImageUpload from '@/components/shared/ImageUpload'

type NewVehicleInput = {
  name: string
  model: string
  plateNumber: string
}

export default function NewVehicle() {
  const form = useForm<NewVehicleInput>()

  const onSubmit = async (data: NewVehicleInput) => {
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <header className='p-4 flex items-center justify-between'>
        <h3>New Vehicle</h3>
        <Button>Save</Button>
      </header>

      <div className='grid grid-cols-12 p-4 gap-4 w-[850px] m-auto'>
        <div
          aria-label='right side'
          className='col-span-7 space-y-4'
        >
          <Card className='shadow-none'>
            <CardHeader>
              <CardTitle className='text-base'>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-1'>
                <Label htmlFor='name'>Vehicle Name</Label>
                <Input
                  id='name'
                  required
                  {...form.register('name')}
                  placeholder='Enter vehicle name'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='model'>Vehicle Model</Label>
                <Input
                  id='model'
                  required
                  {...form.register('model')}
                  placeholder='Enter model'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='plateNumber'>Plate Number</Label>
                <Input
                  id='plateNumber'
                  required
                  {...form.register('plateNumber')}
                  placeholder='Enter plate number'
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div
          aria-label='right side'
          className='col-span-5 space-y-4'
        >
          <div>
            <ImageUpload
              onImageChange={({ imageSrc }) => {}}
              inputName={'photo'}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
