'use client'

import useBoxControls from './(public)/box/useBoxControls'

import Panels from './(public)/box/Panels'
import DimensionControls from './(public)/box/_controls/dimensions'
import Phase2Controls from './(public)/box/_controls/Phase2Controls'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { ScrollArea } from '@/components/ui/scroll-area'
import Phase1Controls from './(public)/box/_controls/Phase1Controls'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export default function Home() {
  const controls = useBoxControls()

  return (
    <main className='grid grid-cols-[250px_1fr]'>
      <ScrollArea className='h-screen border-r'>
        <div>
          <Button onClick={() => signIn('google')}>Sign</Button>
        </div>
        <Accordion
          type='multiple'
          className='w-full'
        >
          <AccordionItem value='dimensions'>
            <AccordionTrigger className='p-4 small text-muted-foreground'>
              Dimensions
            </AccordionTrigger>
            <AccordionContent>
              <DimensionControls controls={controls} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='phase-1'>
            <AccordionTrigger className='p-4 small text-muted-foreground'>
              Phase 1 Markings
            </AccordionTrigger>
            <AccordionContent>
              <Phase1Controls controls={controls} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='phase-2'>
            <AccordionTrigger className='p-4 small text-muted-foreground'>
              Phase 2 Markings
            </AccordionTrigger>
            <AccordionContent>
              <Phase2Controls controls={controls} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>

      <Panels controls={controls} />
    </main>
  )
}
