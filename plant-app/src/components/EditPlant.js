import React, { useEffect, useState } from 'react';
import { initialDayValues } from './PlantFormComponents/initialValues';
import PlantManager from './PlantFormComponents/PlantManager';
import { useParams, useHistory } from 'react-router-dom';
import { axiosWithAuth } from './axiosWithAuth';


// /**** Tested functionality by removing 'props' from EditPlant(props), and uncommenting below  ****/
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


export default function EditPlant() {
  const { id } = useParams();
  const { push } = useHistory();
  const [props, setProps] = useState()

  const getPlant = plant => {
    axiosWithAuth()
      .get(`plants/plant/${id}`)
      .then(res => {
        setProps(res.data)
        console.log('Success:',res)
      })
      .catch(err => {
        console.log('Error:',err)
      })
  }

  useEffect(() => {
    getPlant();
  },[]);

  if (!props){
    return <h3>LOADING...</h3>
  }

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
    if (props.days !== "undefined" && props.days !== null) {
      props.days?.split(',').forEach(day =>{
        dayObj[day] = true;
      })
      return dayObj
    } else {
      return initialDayValues;
    }
  }

  const putPlant = plant => {
    axiosWithAuth()
      .put(`plants/plant/${id}`, plant)
      .then(res => {
        console.log('Success:',res)
        push("/My-plants")
      })
      .catch(err => {
        console.log(plant)
        console.log('Error:',err)
      })
  }

  return (
    <div>
      <PlantManager initialFormValues={initialFormValues} initialDayValues={daysToUse()} mailPlant={putPlant} mailType='put' />
    </div>
  )
}