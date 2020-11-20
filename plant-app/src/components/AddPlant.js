import React from 'react';
import PlantManager from './PlantFormComponents/PlantManager';
import axios from 'axios';
import { initialFormValues, initialDayValues } from './PlantFormComponents/initialValues'

export default function addPlant() {

  const postPlant = newPlant => {
    axios
      .post('https://reqres.in/api/users', newPlant)
      .then(res => {
        console.log('Success:',res)
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