'use server'

import { cloud } from "@/common/configs/cloud";
import { UpdateVehicleInput } from "./VehicleDetails";

export async function updateVehicleAction(data: UpdateVehicleInput) {
  if (typeof data.photoUrl === 'string') {
    const cloudResponse = await cloud.uploader.upload(data.photoUrl, {
      public_id: `vehicle-${data.id}`,
      overwrite: true,
      filename_override: data.id,
      folder: 'loreto',
    })
    // console.log('cloudResponse', cloudResponse)
    return { status: 201, data: { photoUrl: cloudResponse.secure_url } }
  }

  return { status: 201 }
}
