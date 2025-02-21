'use client'

import { createPortal } from 'react-dom'
import useBoxControls from './useBoxControls'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { XIcon } from 'lucide-react'
import { computePrice, getPricePerInch, pesos } from '@/lib/utils'
import { SlidingNumber } from '@/components/ui/sliding-number'

type Props = {
  controls: ReturnType<typeof useBoxControls>
}

export default function BoxQuotation(props: Props) {
  const toggleQuotationOpen = () => {
    props.controls.setQuotationOpen((o) => !o)
  }

  const computation = computePrice({
    height: props.controls.height,
    length: props.controls.pixelLength,
    width: props.controls.pixelWidth,
    thickness: props.controls.boxThickness === 1 ? 'single' : 'double',
  })

  return (
    <>
      <Button
        onClick={toggleQuotationOpen}
        variant='outline'
      >
        See Quotation
      </Button>
      {props.controls.quotationOpen &&
        createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='fixed top-0 left-0 w-full h-full bg-black/40'
          >
            <Button
              size={'icon'}
              variant={'secondary'}
              onClick={toggleQuotationOpen}
              className='absolute top-4 right-4 rounded-full'
            >
              <XIcon />
            </Button>

            <div className='w-full h-full grid place-items-center'>
              <div className=' w-[50%] bg-white shadow rounded p-8'>
                <div className='font-bold'>Your Box Quotation</div>

                <div className='grid grid-cols-2 gap-4 w-1/2 mt-8 items-center'>
                  <div>Thickness:</div>
                  <div className='flex items-center gap-1'>
                    <Button
                      size={'sm'}
                      variant={
                        props.controls.boxThickness == 1 ? 'outline' : 'ghost'
                      }
                      onClick={() => props.controls.setBoxThickness(1)}
                    >
                      Single
                    </Button>
                    <Button
                      size={'sm'}
                      variant={
                        props.controls.boxThickness == 2 ? 'outline' : 'ghost'
                      }
                      onClick={() => props.controls.setBoxThickness(2)}
                    >
                      Double
                    </Button>
                  </div>

                  <div>
                    Price/
                    <code>
                      <sup>2</sup>inch
                    </code>
                    :
                  </div>
                  <div>
                    <SlidingNumber
                      value={
                        +getPricePerInch(props.controls.boxThickness).toFixed(2)
                      }
                    />
                  </div>

                  <div>Height:</div>
                  <div>
                    {props.controls.height}
                    <code>in</code>{' '}
                  </div>

                  <div>Width:</div>
                  <div>
                    {props.controls.pixelWidth}
                    <code>in</code>{' '}
                  </div>

                  <div>Length:</div>
                  <div>
                    {props.controls.pixelLength}
                    <code>in</code>{' '}
                  </div>

                  <div className='font-bold'>Total Cost:</div>
                  <div className='font-bold inline-flex'>
                    ₱
                    <SlidingNumber value={+computation.totalPrice.toFixed(2)} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>,
          document.body
        )}
    </>
  )
}
