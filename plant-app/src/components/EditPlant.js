import React, { useEffect, useState } from 'react';
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


  const initialFormValues = {
    nickname: "",
    image: "",
    species: "",
    description: "",
    datePlanted: "",
    frequency: "",
    careInstructions: "",
  }


 function EditPlant(props) {

  const [plant, setPlant] = useState({});
  const [formValues, setFormValues] = useState(initialFormValues);
  
  const { id } = useParams();
  console.log(id);
  const { push } = useHistory();

  
  useEffect(() => {
    const getPlant = () => {
      axiosWithAuth()
        .get(`plants/plant/${id}`)
        .then(res => {
          setPlant(res.data)
          setFormValues(res.data)
          console.log(res.data)
          console.log('Success:',res)
        })
        .catch(err => {
          console.log('Error:',err)
        })
    }
    getPlant();
  }, [id]);



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
      <PlantManager 
      // initialFormValues={plant} 
      formValues={formValues}
      setFormValues={setFormValues}
      initialDayValues={daysToUse()}
      mailPlant={putPlant} mailType='put' />
    </div>
  )
}

export default EditPlant;