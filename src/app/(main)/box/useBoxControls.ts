import { useEffect, useRef, useState } from 'react'
import { ImperativePanelHandle } from 'react-resizable-panels'

export type LocalMarking = {
  id: number
  label: string
  value: string
  transform: string
}

export default function useBoxControls() {
  // actual pixel
  const [height, setHeight] = useState(0)
  const [pixelWidth, setPixelWidth] = useState(0)
  const [pixelLength, setPixelLength] = useState(0)

  const [dimKey, setDimKey] = useState(0)

  const [containerWidth, setContainerWidth] = useState(0)

  const [dragTransform, setDragTransform] = useState<string | undefined>(
    undefined
  )

  // percentage
  const [widthPercentage, setWidthPercentage] = useState(35)
  const [lengthPercentage, setLengthPercentage] = useState(45)

  // controls refs
  const widthRef = useRef<HTMLInputElement>(null)
  const lengthRef = useRef<HTMLInputElement>(null)
  const heightRef = useRef<HTMLInputElement>(null)

  // panel refs
  const wPanelRef = useRef<ImperativePanelHandle>(null)
  const lPanelRef = useRef<ImperativePanelHandle>(null)

  // markgins
  const [markings, setMarkings] = useState<LocalMarking[]>([])

  useEffect(() => {
    if (height !== 0) localStorage.setItem('box__height', height.toString())
  }, [height])

  useEffect(() => {
    const h = localStorage.getItem('box__height')

    if (h) {
      setHeight(+h)
      setDimKey(+h)
    } else {
      setHeight(400)
      setDimKey(400)
    }

    const dt = localStorage.getItem('drag__transform')
    if (dt) {
      setDragTransform(dt)
    } else {
      setDragTransform('translate(0px, 100px)')
    }

    const containerWidth = localStorage.getItem('container__width')
    if (containerWidth) {
      setContainerWidth(+containerWidth)
      setDimKey(+containerWidth)
    } else {
      setContainerWidth(600)
      setDimKey(600)
    }

    const markings = localStorage.getItem('box-markings')
    if (markings) {
      setMarkings(JSON.parse(markings))
      return
    }
    const newMarkings = [
      {
        label: 'Serial No:',
        value: '123456',
        transform: 'translate(50px, 100px)',
        id: 1,
      },
    ]
    setMarkings(newMarkings)
    localStorage.setItem('box-markings', JSON.stringify(newMarkings))
  }, [])

  const addMarking = (marking: LocalMarking): boolean => {
    const newMarkings = [...markings, marking]
    localStorage.setItem('box-markings', JSON.stringify(newMarkings))
    setMarkings(newMarkings)
    return true
  }

  const updateMarkValue = (marking: LocalMarking): void => {
    const mark = markings.find((m) => m.id === marking.id)
    if (mark) {
      mark.value = marking.value
      localStorage.setItem('box-markings', JSON.stringify(markings))
      setMarkings([...markings])
    }
  }

  const updateMarkLabel = (marking: LocalMarking): void => {
    const mark = markings.find((m) => m.id === marking.id)
    if (mark) {
      mark.label = marking.label
      localStorage.setItem('box-markings', JSON.stringify(markings))
      setMarkings([...markings])
    }
  }

  const removeMarking = (marking: LocalMarking): void => {
    const newMarkings = markings.filter((m) => m.id !== marking.id)
    localStorage.setItem('box-markings', JSON.stringify(newMarkings))
    setMarkings(newMarkings)
  }

  const applyChanges = () => {
    const width = widthRef.current?.valueAsNumber ?? 0
    const length = lengthRef.current?.valueAsNumber ?? 0
    const height = heightRef.current?.valueAsNumber ?? 0

    setDimKey(height)
    setHeight(height)

    const wPercent = (width / containerWidth) * 100
    const lPercent = (length / containerWidth) * 100

    wPanelRef.current?.resize(wPercent)
    lPanelRef.current?.resize(lPercent)
  }

  return {
    height,
    setHeight,
    pixelWidth,
    setPixelWidth,
    pixelLength,
    setPixelLength,
    containerWidth,
    setContainerWidth,
    widthPercentage,
    setWidthPercentage,
    lengthPercentage,
    setLengthPercentage,
    widthRef,
    lengthRef,
    heightRef,
    applyChanges,
    wPanelRef,
    lPanelRef,
    markings,
    setMarkings,
    addMarking,
    updateMarkValue,
    updateMarkLabel,
    removeMarking,
    dimKey,
    setDimKey,
    dragTransform,
    setDragTransform,
  }
}
