/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { UploadIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

export default function ImageUpload(props: {
  initialImageSrc: string
  onImageChange: (imageSrc: string) => void
  inputName: string
  hidden?: boolean
}) {

  const [imageSrc, setImageSrc] = useState(props.initialImageSrc)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='relative overflow-hidden rounded-lg bg-white border'>
      <input
        hidden
        ref={fileInputRef}
        type='file'
        name={props.inputName}
        id={props.inputName}
        accept='image/*'
        multiple={false}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
              const imageSrc = e.target?.result as string
              props.onImageChange(imageSrc)
              setImageSrc(imageSrc)
            }
            reader.readAsDataURL(file)
          }
        }}
      />

      <img
        src={props.hidden ? props.initialImageSrc : imageSrc}
        alt='Upload Image'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />

      <div
        aria-label='overlay'
        className={cn("p-5", { 'hidden': props.hidden })}
      >
        <div className="flex items-center gap-2">
          <Button
            size={'sm'}
            type='button'
            variant={'outline'}
            onClick={() => fileInputRef.current?.click()}>
            <UploadIcon className="mr-2" />
            Upload
          </Button>
          <Button
            size={'sm'}
            type='button'
            variant={'ghost'}
            disabled={props.initialImageSrc === imageSrc}
            onClick={() => setImageSrc(props.initialImageSrc)}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
