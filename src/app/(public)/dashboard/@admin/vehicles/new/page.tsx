'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Prisma } from '@prisma/client'
import { useForm } from 'react-hook-form'

type CreateVehileInput = Prisma.VehicleCreateInput

export default function NewVehicle() {
  const form = useForm<CreateVehileInput>()

  const onSubmit = async (data: CreateVehileInput) => {
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
                  {...form.register('name')}
                  placeholder='Vehicle Name'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='model'>Vehicle Model</Label>
                <Input
                  id='model'
                  {...form.register('model')}
                  placeholder='Vehicle Model'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='plateNumber'>Plate Number</Label>
                <Input
                  id='plateNumber'
                  {...form.register('plateNumber')}
                  placeholder='Plate Number'
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div
          aria-label='right side'
          className='col-span-5 space-y-4'
        ></div>
      </div>
    </form>
  )
}
