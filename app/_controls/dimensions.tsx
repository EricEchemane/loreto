import { Button } from '@/components/ui/button'
import useBoxControls from '../useBoxControls'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

interface Props {
  controls: ReturnType<typeof useBoxControls>
}

export default function DimensionControls(props: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        props.controls.applyChanges()
      }}
      className='grid gap-4 p-4'
    >
      <div className='flex items-center justify-between'>
        <div className='text-muted-foreground small'>Dimensions</div>
        <Button size={'sm'}>Apply</Button>
      </div>
      <div className='flex items-center justify-between'>
        <label
          htmlFor='Width'
          className='small'
        >
          Width
        </label>
        <Input
          ref={props.controls.widthRef}
          id='Width'
          type='number'
          placeholder='Width'
          defaultValue={props.controls.pixelWidth}
          key={props.controls.pixelWidth}
          className='w-24'
        />
      </div>
      <div className='flex items-center justify-between'>
        <label
          htmlFor='Length'
          className='small'
        >
          Length
        </label>
        <Input
          ref={props.controls.lengthRef}
          id='Length'
          type='number'
          placeholder='Length'
          defaultValue={props.controls.pixelLength}
          key={props.controls.pixelLength}
          className='w-24'
        />
      </div>
      <div className='flex items-center justify-between'>
        <label
          htmlFor='Height'
          className='small'
        >
          Height
        </label>
        <Input
          ref={props.controls.heightRef}
          type='number'
          id='Height'
          placeholder='Height'
          defaultValue={props.controls.height}
          key={props.controls.height}
          className='w-24'
        />
      </div>
      <Slider
        value={[props.controls.height]}
        max={1000}
        onValueChange={(value) => props.controls.setHeight(value[0])}
        step={1}
        className='w-full'
      />
    </form>
  )
}
