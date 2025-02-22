'use client'

import { createPortal } from 'react-dom'
import useBoxControls from './useBoxControls'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { XIcon } from 'lucide-react'
import { computePrice, getPricePerInch } from '@/lib/utils'
import { SlidingNumber } from '@/components/ui/sliding-number'
import { ReactNode, useState } from 'react'

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

  const [scaleFactor, setScaleFactor] = useState(8)
  const color = '#af8e76'
  const createBox = (w: number, label: ReactNode = null) => {
    return (
      <div
        className='border h-full text-xs grid place-items-center text-white'
        style={{
          width: `${w * scaleFactor}px`,
          backgroundColor: color,
          backgroundImage: 'url(/karton.avif)',
        }}
      >
        {label}
      </div>
    )
  }

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
              <div className='bg-white shadow rounded p-8'>
                <div className='flex items-start justify-between'>
                  <div className='font-bold'>Your Box Quotation</div>
                  <div className='font-medium text-primary text-sm'>
                    @LoretoTrading
                  </div>
                </div>

                <section className='grid grid-cols-2 gap-4 w-1/2 mt-8 items-center'>
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

                  <div>Total Box Area:</div>
                  <div>
                    {computation.totalArea}
                    <code>
                      <sup>2</sup>inch
                    </code>
                  </div>

                  <div className='font-bold'>Total Cost:</div>
                  <div className='font-bold inline-flex border-b-4'>
                    ₱
                    <SlidingNumber value={+computation.totalPrice.toFixed(2)} />
                  </div>
                </section>

                <Render2DBox
                  controls={props.controls}
                  scaleFactor={scaleFactor}
                />
              </div>
            </div>
          </motion.div>,
          document.body
        )}
    </>
  )
}

export function Render2DBox(props: {
  controls: ReturnType<typeof useBoxControls>
  scaleFactor: number
}) {
  return (
    <section
      className='mt-8 h-auto relative'
      style={{
        width: `${
          (props.controls.pixelWidth + props.controls.pixelLength) *
            2 *
            props.scaleFactor +
          (props.controls.pixelWidth / 2) * props.scaleFactor
        }px`,
      }}
    >
      <BoxRow2D height={(props.controls.pixelWidth * props.scaleFactor) / 2}>
        <BoxPortion
          isCover='top'
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelWidth}
        >
          Top side cover
        </BoxPortion>
        <BoxPortion
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelLength}
        >
          Top long cover
        </BoxPortion>
        <BoxPortion
          isCover='top'
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelWidth}
        >
          Top side cover
        </BoxPortion>
        <BoxPortion
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelLength}
        >
          Top long cover
        </BoxPortion>
      </BoxRow2D>

      <BoxRow2D height={props.controls.height * props.scaleFactor}>
        <BoxPortion
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelWidth}
        >
          <span>Left side</span>
          <pre>
            {props.controls.pixelWidth}x{props.controls.height}
          </pre>
        </BoxPortion>
        <BoxPortion
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelLength}
        >
          <span>Front</span>
          <pre>
            {props.controls.pixelLength}x{props.controls.height}
          </pre>
        </BoxPortion>
        <BoxPortion
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelWidth}
        >
          <span>Right side</span>
          <pre>
            {props.controls.pixelWidth}x{props.controls.height}
          </pre>
        </BoxPortion>
        <BoxPortion
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelLength}
        >
          <span>Back</span>
          <pre>
            {props.controls.pixelLength}x{props.controls.height}
          </pre>
        </BoxPortion>
        <BoxPortion
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelWidth / 2}
        />
      </BoxRow2D>

      <BoxRow2D height={(props.controls.pixelWidth * props.scaleFactor) / 2}>
        <BoxPortion
          isCover='bottom'
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelWidth}
        >
          Bottom cover
        </BoxPortion>
        <BoxPortion
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelLength}
        >
          Bottom cover
        </BoxPortion>
        <BoxPortion
          isCover='bottom'
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelWidth}
        >
          Bottom cover
        </BoxPortion>
        <BoxPortion
          scaleFactor={props.scaleFactor}
          width={props.controls.pixelLength}
        >
          Bottom cover
        </BoxPortion>
      </BoxRow2D>
    </section>
  )
}

function BoxPortion({
  children,
  width,
  scaleFactor,
  isCover,
}: {
  width: number
  children?: ReactNode
  scaleFactor: number
  isCover?: 'top' | 'bottom'
}) {
  const getClipPath = () => {
    if (isCover === 'top') return 'polygon(3% 0, 97% 0%, 100% 100%, 0% 100%)'
    if (isCover === 'bottom') return 'polygon(0 0, 100% 0%, 97% 100%, 3% 100%)'
    return undefined
  }

  return (
    <div
      className='border h-full text-sm flex flex-col items-center justify-center text-white'
      style={{
        width: `${width * scaleFactor}px`,
        backgroundImage: 'url(/karton.avif)',
        clipPath: getClipPath(),
      }}
    >
      {children}
    </div>
  )
}

function BoxRow2D({
  children,
  height,
}: {
  children: ReactNode
  height: number
}) {
  return (
    <div
      className='flex'
      style={{
        height: `${height}px`,
      }}
    >
      {children}
    </div>
  )
}
