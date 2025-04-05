import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

export interface Region {
  code: string
  name: string
  regionName: string
  islandGroupCode: string
  psgc10DigitCode: string
}

export interface City {
  code: string
  name: string
  oldName: string
  isCapital: boolean
  provinceCode: string
  districtCode: boolean
  regionCode: string
  islandGroupCode: string
  psgc10DigitCode: string
}

export interface Barangay {
  code: string
  name: string
  oldName: string
  subMunicipalityCode: boolean
  cityCode: boolean
  municipalityCode: string
  districtCode: boolean
  provinceCode: string
  regionCode: string
  islandGroupCode: string
  psgc10DigitCode: string
}

export default function usePhAddressQuery() {
  const [selectedRegion, setSelectedRegion] = useState<Region | undefined>(
    undefined
  )
  const regionsQuery = useQuery({
    queryKey: ['regions'],
    queryFn: () => {
      return axios.get<Region[]>('https://psgc.gitlab.io/api/regions/')
    },
  })
  const findRegionByCode = (code: string) =>
    regionsQuery.data?.data.find((r) => r.code === code)

  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined)
  const citiesQuery = useQuery({
    queryKey: ['cities', selectedRegion?.code],
    enabled: !!selectedRegion?.code,
    queryFn: () => {
      return axios.get<City[]>(
        `https://psgc.gitlab.io/api/regions/${selectedRegion?.code}/cities`
      )
    },
  })
  const findCityByCode = (code: string) =>
    citiesQuery.data?.data.find((c) => c.code === code)

  const [selectedBarangay, setSelectedBarangay] = useState<
    Barangay | undefined
  >(undefined)
  const brgysQuery = useQuery({
    queryKey: ['cities', selectedCity?.code],
    enabled: !!selectedCity?.code,
    queryFn: () => {
      return axios.get<Barangay[]>(
        `https://psgc.gitlab.io/api/cities/${selectedCity?.code}/barangays`
      )
    },
  })
  const findBrgyByCode = (code: string) =>
    brgysQuery.data?.data.find((b) => b.code === code)

  const [subdivisionOrVillage, setSubdivisionOrVillage] = useState<
    string | undefined
  >()
  const [streetOrBuilding, setStreetOrBuilding] = useState<string | undefined>()
  const [lotOrUnitNumber, setLotOrUnitNumber] = useState<string | undefined>()

  const constructFullAddress = (): string => {
    if (selectedRegion && selectedCity && selectedBarangay) {
      let fullAddress = ''
      if (lotOrUnitNumber) fullAddress += lotOrUnitNumber + ' '
      if (streetOrBuilding) fullAddress += streetOrBuilding + ', '
      if (subdivisionOrVillage) fullAddress += subdivisionOrVillage + ' '
      fullAddress += `Brgy. ${selectedBarangay.name}, ${selectedCity.name}, ${selectedRegion.name}`
      return fullAddress
    }
    return ''
  }

  const fullAddress = constructFullAddress()

  return {
    regionsQuery,
    citiesQuery,
    brgysQuery,
    selectedRegion,
    setSelectedRegion,
    regions: regionsQuery.data?.data ?? [],
    selectedCity,
    setSelectedCity,
    cities: citiesQuery.data?.data ?? [],
    selectedBarangay,
    setSelectedBarangay,
    barangays: brgysQuery.data?.data ?? [],
    subdivisionOrVillage,
    setSubdivisionOrVillage,
    streetOrBuilding,
    setStreetOrBuilding,
    lotOrUnitNumber,
    setLotOrUnitNumber,
    findRegionByCode,
    findCityByCode,
    findBrgyByCode,
    fullAddress,
  }
}
