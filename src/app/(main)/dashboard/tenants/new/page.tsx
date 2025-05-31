'use client'

import FormGroup from '@/components/shared/forms/FormGroup'
import FormItem from '@/components/shared/forms/FormItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { TNewTenant } from '../tenants-action'

export default function NewTenantPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (formtData: FormData) => {
    const payload: TNewTenant = {
      firstName: '',
      lastName: '',
      contactNumber: '',
      moveInDate: '',
      monthlyDueDate: 0,
      monthlyPayment: 0,
    }
  }

  return (
    <div>
      <header className='p-4 flex items-center justify-between'>
        <h2>Add new tenant</h2>
      </header>
      <form
        className='mx-auto max-w-3xl grid grid-cols-2 gap-4'
        action={handleSubmit}
      >
        <FormGroup groupTitle='Tenant Information'>
          <FormItem title='First Name'>
            <Input
              required
              name='first_name'
            />
          </FormItem>
          <FormItem title='Last Name'>
            <Input
              required
              name='last_name'
            />
          </FormItem>
          <FormItem title='Contact Number'>
            <Input
              required
              name='contact_number'
            />
          </FormItem>
        </FormGroup>

        <FormGroup groupTitle='Tenancy Details'>
          <FormItem title='Monthly Payment (PHP)'>
            <Input
              required
              type='number'
              name='monthly_payment'
            />
          </FormItem>
          <FormItem title='Move in Date'>
            <Input
              required
              type='date'
              name='movein_date'
            />
          </FormItem>
          <FormItem title='Monthly Due Date (Ex: Every 30)'>
            <Input
              required
              type='number'
              name='monthly_due_date'
            />
          </FormItem>
        </FormGroup>

        <div></div>
        <div className='flex justify-end mt-4'>
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending}
      className='w-[100px]'
    >
      {pending && <Loader2 className='w-4 h-4 animate-spin mr-1' />}
      Submit
    </Button>
  )
}
