import { cn } from '@/lib/utils'
import React from 'react'

const icons = [
  'local_shipping',
  'apartment',
  'package_2',
  'orders',
  'receipt_long',
  'other_houses',
  'person_edit',
  'manage_accounts',
  'settings',
  'dashboard',
] as const

export default function MaterialIcon(props: {
  name: (typeof icons)[number]
  className?: string
}) {
  return (
    <span className={cn('material-symbols-outlined', props.className)}>
      {props.name}
    </span>
  )
}
