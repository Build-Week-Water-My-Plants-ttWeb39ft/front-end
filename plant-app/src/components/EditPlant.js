import React from 'react';
import { initialDayValues } from './PlantFormComponents/initialValues';
import PlantManager from './PlantFormComponents/PlantManager';
import axios from 'axios';


/**** Tested functionality by removing 'props' from EditPlant(props), and uncommenting below  ****/
// const props = {
//   "nickname": "test plant",
//   "species": "Unknown",
//   "frequency": "biweekly",
//   "days": "tuesday,thursday,saturday,sunday",
//   "image": "image url goes here",
//   "datePlanted": "2020-11-17",
//   "careInstructions": "Place in sunlight",
//   "user": "3",
//   "description": "",
//   }


export default function EditPlant(props) {
  const initialFormValues = {
    nickname: props.nickname,
    image: props.image,
    species: props.species,
    description: props.description,
    datePlanted: props.datePlanted,
    frequency: props.frequency,
    careInstructions: props.careInstructions,
  }

  const daysToUse = ()=> {
    const dayObj = {...initialDayValues}
    props.days.split(',').forEach(day =>{
      dayObj[day] = true;
    })
    return dayObj
  }

  const putPlant = plant => {
    axios
      .put('https://reqres.in/api/users2', plant)
      .then(res => {
        console.log('Success:',res)
      })
      .catch(err => {
        console.log('Error:',err)
      })
  }
  

  return (
    <div>
      <PlantManager initialFormValues={initialFormValues} initialDayValues={daysToUse()} mailPlant={putPlant} mailType='put' />
    </div>
  )
}