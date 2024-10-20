'use client'

import FormItem from '@/components/shared/forms/FormItem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'
import {
  createNewPasswordAction,
  sendEmailResetPasswordLinkAction,
} from './reset-password-actions'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { NewPassword, NewPasswordSchema } from './new-password-schema'
import { zodResolver } from '@hookform/resolvers/zod'

enum Step {
  EnterEmail,
  ResetLinkSent,
  CreateNewPassword,
  PasswordResetSuccessfully,
}

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams()
  const uid = searchParams.get('uid')
  const [sendingEmail, setSendingEmail] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>(
    uid ? Step.CreateNewPassword : Step.EnterEmail
  )

  const [creatingNewPassword, setCreatingNewPassword] = useState(false)
  const newPasswordForm = useForm<NewPassword>({
    resolver: zodResolver(NewPasswordSchema),
  })
  const errors = newPasswordForm.formState.errors

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSendingEmail(true)
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')?.toString() ?? ''
    const res = await sendEmailResetPasswordLinkAction(email)
    if (res.ok) {
      setCurrentStep(Step.ResetLinkSent)
    } else {
      toast.error('Something went wrong, please try again later.', {
        richColors: true,
      })
    }
    setSendingEmail(false)
  }

  const submitCreateNewPassword = async (data: NewPassword) => {
    setCreatingNewPassword(true)
    const res = await createNewPasswordAction(
      uid as string,
      data.confirmPassword
    )
    if (res.ok) {
      setCurrentStep(Step.PasswordResetSuccessfully)
    } else {
      toast.error('Something went wrong, please try again later.', {
        richColors: true,
      })
    }
    setCreatingNewPassword(false)
  }

  return (
    <div className='border rounded-2xl shadow max-w-md mx-auto p-6 my-12'>
      {currentStep === Step.CreateNewPassword && (
        <>
          <header className='mb-8'>
            <div className='font-medium text-lg'>Create New Password</div>
            <p className='text-muted-foreground text-sm'>
              The password should be different from the previous password.
            </p>
          </header>
          <form
            className='space-y-4'
            onSubmit={newPasswordForm.handleSubmit(submitCreateNewPassword)}
          >
            <FormItem
              title='New Password'
              error={errors?.password?.message}
            >
              <Input
                required
                type='password'
                {...newPasswordForm.register('password')}
              />
            </FormItem>
            <FormItem
              title='Confirm Password'
              error={errors?.confirmPassword?.message}
            >
              <Input
                required
                type='password'
                {...newPasswordForm.register('confirmPassword')}
              />
            </FormItem>
            <div className='flex justify-end pt-2'>
              <Button loading={creatingNewPassword}>Reset Password</Button>
            </div>
          </form>
        </>
      )}

      {currentStep === Step.EnterEmail && (
        <>
          <header className='mb-8'>
            <div className='font-medium text-lg'>Forgot Password</div>
            <p className='text-muted-foreground text-sm'>
              {
                "Enter the email address with your account and we'll send you a link to reset your password."
              }
            </p>
          </header>
          <form onSubmit={handleSubmit}>
            <FormItem title='Account Email Address'>
              <Input
                required
                type='email'
                name='email'
                placeholder='Ente your email'
              />
            </FormItem>
            <div className='flex justify-end mt-4'>
              <Button loading={sendingEmail}>Send Reset Link</Button>
            </div>
          </form>
        </>
      )}

      {currentStep === Step.ResetLinkSent && (
        <div>
          <h3>Email Sent</h3>
          <p className='text-muted-foreground text-sm mt-1'>
            {
              "We've sent you an email with a link to reset your password. Please check your email and follow the instructions."
            }
          </p>
          <div className='flex justify-end mt-4'>
            <Button onClick={() => setCurrentStep(Step.EnterEmail)}>
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
