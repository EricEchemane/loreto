'use client'

import { RefObject, useRef, useState } from 'react'

import Moveable from 'react-moveable'
import { flushSync } from 'react-dom'
import useBoxControls, { LocalMarking } from '@/app/(main)/box/useBoxControls'
import { Label } from '@/components/ui/label'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

import { Input } from '../ui/input'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

interface Props {
  containerRef: RefObject<HTMLDivElement>
  controls: ReturnType<typeof useBoxControls>
  parentWidth: number
  marking: LocalMarking
}

export default function BoxMarking(props: Props) {
  const targetRef = useRef<HTMLDivElement>(null)

  const [targetted, setTargetted] = useState(false)

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            onMouseOver={() => setTargetted(true)}
            onMouseUp={() => {
              setTargetted(false)
              const markings = localStorage.getItem('box-markings')
              if (markings) {
                const parsed = JSON.parse(markings) as LocalMarking[]
                props.controls.setMarkings(parsed)
              }
            }}
            onMouseLeave={() => setTargetted(false)}
            ref={targetRef}
            className='p-2 cursor-move inline-block'
            style={{
              transform: props.marking.transform,
            }}
          >
            {props.marking.label} {props.marking.value}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='rounded-xl'>
          <div className='grid grid-cols-[.3fr_1fr] gap-4 items-center p-4'>
            <Label className='text-right'>Label</Label>
            <Input
              defaultValue={props.marking.label}
              // onChange={(e) =>
              //   props.controls.updateMarkLabel({
              //     ...props.marking,
              //     label: e.target.value,
              //   })
              // }
            />
            <Label className='text-right'>Value</Label>
            <Input
              defaultValue={props.marking.value}
              onChange={(e) =>
                props.controls.updateMarkValue({
                  ...props.marking,
                  value: e.target.value,
                })
              }
            />
            <Label className='text-right'>Location</Label>
            <div>
              <Tabs defaultValue={props.marking.phase.toString()}>
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='1'>Phase 1</TabsTrigger>
                  <TabsTrigger value='2'>Phase 2</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </ContextMenuContent>
      </ContextMenu>
      <Moveable
        key={props.parentWidth}
        draggable
        hideDefaultLines={!targetted}
        flushSync={flushSync}
        target={targetRef.current}
        origin={false}
        onDrag={(e) => {
          e.target.style.transform = e.transform
          const markings = localStorage.getItem('box-markings')
          if (markings) {
            const parsed = JSON.parse(markings) as LocalMarking[]
            const index = parsed.findIndex(
              (m) => m.label === props.marking.label
            )
            parsed[index].transform = e.transform
            localStorage.setItem('box-markings', JSON.stringify(parsed))
          }
        }}
      />
    </>
  )
}