import React, { useEffect } from 'react';
import { initialDayValues } from './PlantFormComponents/initialValues';
import PlantManager from './PlantFormComponents/PlantManager';
import { useParams, useHistory } from 'react-router-dom';
import PlantForm from './PlantFormComponents/PlantForm';
import { axiosWithAuth } from './axiosWithAuth';


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

  const { id } = useParams();
  const { push } = useHistory();

  const getPlant = plant => {
    axiosWithAuth()
      .get(`plants/plant/${id}`, plant)
      .then(res => {
        console.log('Success:',res)
      })
      .catch(err => {
        console.log('Error:',err)
      })
  }

  const putPlant = plant => {
    axiosWithAuth()
      .put(`plants/plant/${id}`, plant)
      .then(res => {
        console.log('Success:',res)
        push("/My-plants")
      })
      .catch(err => {
        console.log('Error:',err)
      })
  }
  
  useEffect(() => {
    getPlant();
  },[]);

  return (
    <div>
      <PlantManager initialFormValues={initialFormValues} initialDayValues={daysToUse()} mailPlant={putPlant} mailType='put' />
    </div>
  )
}