import React from 'react';
import PlantManager from './PlantFormComponents/PlantManager';
import { initialFormValues, initialDayValues } from './PlantFormComponents/initialValues'
import { axiosWithAuth } from './axiosWithAuth';

export default function addPlant() {

  const postPlant = newPlant => {
    axiosWithAuth()
      .post('plants/plants', newPlant)
      .then(res => {
        console.log(newPlant)
        console.log('Success:',res)
      })
      .catch(err => {
        console.log(newPlant)
        console.log('Error:',err)
      })
  }

  return(
    <div>
      <PlantManager mailPlant={postPlant} initialFormValues={initialFormValues} initialDayValues={initialDayValues} mailType='post' />
    </div>
  )
}