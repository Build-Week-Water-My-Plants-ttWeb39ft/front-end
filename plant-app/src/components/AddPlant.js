import React from 'react';
import PlantManager from './PlantFormComponents/PlantManager';
import { initialFormValues, initialDayValues } from './PlantFormComponents/initialValues'
import { axiosWithAuth } from './axiosWithAuth';
import { useHistory } from 'react-router-dom';

export default function AddPlant() {
  const { push } = useHistory();

  const postPlant = newPlant => {
    axiosWithAuth()
      .post('plants/plant', newPlant)
      .then(res => {
        push("/My-plants")
      })
      .catch(err => {
        console.log('Error:',err)
      })
  }

  return(
    <div>
      <PlantManager mailPlant={postPlant} initialFormValues={initialFormValues} initialDayValues={initialDayValues} mailType='post' />
    </div>
  )
}