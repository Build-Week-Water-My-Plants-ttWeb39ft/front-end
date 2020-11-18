import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import schema from './validation/newPlantSchema'
import axios from 'axios'
import PlantForm from './PlantFormComponents/PlantForm'

const initialFormValues = {
  nickname: '',
  image:'',
  species:'',
  description:'',
  datePlanted:'',
  frequency:'daily',
  careInstructions:'',
}

const initialDayValues = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
}

const initialFormErrors = {
  nickname: '',
  species:'',
  frequency:'',
}

export default function AddPlant(Props) {

  const [formValues, setFormValues] = useState(initialFormValues);
  const [dayValues, setDayValues] = useState(initialDayValues);
  const [disabled, setDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  
  const validate = (name, value) => {
    yup
    .reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({...formErrors, [name]:''}))
    .catch(err => {
      console.log(err)
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0]
      })
    })
  }
  
  const formValueChange = (name, value) => {
    validate(name,value)
    setFormValues({...formValues, [name]: value})
  }

  const dayChange = (name,value) => {
    setDayValues({...dayValues, [name]: value})
  }

  const dayReset = () => setDayValues(initialDayValues);

  const postPlant = newPlant => {
    axios
      .post('https://reqres.in/api/users', newPlant)
      .then(res => {
        console.log('Success:',res)
      })
      .catch(err => {
        console.log('Error:',err)
      })
      .finally(()=>{
        setDayValues(initialDayValues);
        setFormValues(initialFormValues);
      })
  }
  const submit = () => {
    const newPlant ={
      nickname: formValues.nickname.trim(),
      image: formValues.image.trim(),
      species: formValues.species.trim(),
      description: formValues.description.trim(),
      datePlanted: formValues.datePlanted,
      frequency: formValues.frequency,
      careInstructions: formValues.careInstructions.trim(),
      days: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].filter(day => dayValues[day]).toString()
    }
    // console.log(newPlant);
    postPlant(newPlant);
  }


  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => {
        // console.log(valid);
        setDisabled(!valid);
      })
  },[formValues])

 

  return(
    <div>
      <PlantForm 
        formValues={formValues}
        dayValues={dayValues} 
        formErrors={formErrors} 
        formValueChange={formValueChange} 
        disabled={disabled} 
        submit={submit}
        dayChange={dayChange}
        dayReset={dayReset}
        />
    </div>
    
  )
}