import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import schema from '../validation/newPlantSchema'
import PlantForm from './PlantForm'
import { initialFormErrors } from './initialValues'
import { axiosWithAuth } from '../axiosWithAuth';
import { Spring } from "react-spring/renderprops";
import DayConditional from './DayConditional'



export default function PlantManager(props) {
  const { mailPlant, initialDayValues, initialFormValues, mailType, formValues, setFormValues } = props;

  // const [formValues, setFormValues] = useState(initialFormValues);
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

  // const getUser = () => {
  //   axiosWithAuth()
  //   .get('/users/getuserinfo')
  //   .then(res => {
  //     console.log(res.data)
  //     localStorage.setItem('user:id', res.data.userid)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  // useEffect(() => {
  //   getUser();
  // },[]);

  // const id = localStorage.getItem("user:id")

  // const submit = () => {
  //   const plantData ={
  //     nickname: formValues.nickname.trim(),
  //     image: formValues.image.trim(),
  //     species: formValues.species.trim(),
  //     description: formValues.description.trim(),
  //     datePlanted: formValues.datePlanted,
  //     frequency: formValues.frequency,
  //     careInstructions: formValues.careInstructions.trim(),
  //     days: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].filter(day => dayValues[day]).toString(),
  //     // user: `${id}`
  //   }
  //   mailPlant(plantData);
  //   if (mailType === 'post'){
  //     setDayValues(initialDayValues);
  //     setFormValues(initialFormValues);
  //   }
  // }


  useEffect(() => {
    schema.isValid(formValues)
      .then(valid => {
        // console.log(valid);
        setDisabled(!valid);
      })
  },[formValues])

  
  // const { submit, 
  // formValues, formValueChange, formErrors, dayValues, disabled, dayChange, dayReset} = props;

  const onChange = evt => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    formValueChange(name, valueToUse);
  }
  const onSubmit = evt => {
    evt.preventDefault();
    // submit();
     const plantData ={
      nickname: formValues.nickname.trim(),
      image: formValues.image.trim(),
      species: formValues.species.trim(),
      description: formValues.description.trim(),
      datePlanted: formValues.datePlanted,
      frequency: formValues.frequency,
      careInstructions: formValues.careInstructions.trim(),
      days: ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].filter(day => dayValues[day]).toString(),
      // user: `${id}`
    }
    mailPlant(plantData);
    if (mailType === 'post'){
      setDayValues(initialDayValues);
      setFormValues(initialFormValues);
    }
  }


  return(
    <div>
      <Spring
        from={{ opacity: 0, marginTop: -500 }}
        to={{ opacity: 1, marginTop: 0 }}
      >
        {(props) => (
          <div style={props}>
            {/* <PlantForm 
              formValues={formValues}
              dayValues={dayValues} 
              formErrors={formErrors} 
              formValueChange={formValueChange} 
              disabled={disabled} 
              submit={submit}
              dayChange={dayChange}
              dayReset={dayReset}
            /> */}

     
          <form onSubmit={onSubmit} className='plantForm'>
          <h2>Add 
            {
          formValues.nickname !== '' 
          ? `${formValues.nickname}` 
          : 'Your New Plant'} 
          {formValues.species !== '' ? `the ${formValues.species}! 🎉` : ''}</h2>
          {/* <h2>Add {formValues.name ?? "Your new plant"}</h2>
            <h2>Species: {formValues.species ?? "unknown"}</h2> */}
          <label>
            <h3>Plant Name</h3>
            <div className='errors'>{formErrors.nickname}</div>
            <input
              name='nickname'
              placeholder='Give me a name!🌱'
              type='text'
              value={formValues.nickname}
              onChange={onChange}
            />
          </label>
          <label>
            <h3>Plant Image</h3>
            {formValues.image !== '' ? (<div className='plantImage'><img
            src={formValues.image === 'Bill' ? 'http://highfivethepodcast.com/wp-content/uploads/2016/09/1607048_10151928821933004_257352888_n.jpg' : formValues.image}
            alt='Your plant!' /> </div>) : ''}
            <input
              name='image'
              // type='file' //For file need to research how to actually have it upload to server
              // accept='image/png, image/jpeg, image/gif'
              type='text'
              placeholder="Image URL for your plant!"
              value={formValues.image}
              onChange={onChange} 
            />
          </label>
          <label>
            <h3>Plant Species</h3>
            <div className='errors'>{formErrors.species}</div>
            <input
              name='species'
              type='text'
              placeholder='What is my species?'
              value={formValues.species}
              onChange={onChange} 
              />
          </label>
          <label>
            <h3>Plant Description</h3>
            <input
              name='description'
              type='text'
              placeholder='Ex: Gift from Helen in den'
              value={formValues.description}
              onChange={onChange} 
              />
          </label>
          <label>
            <h3>Date Planted</h3>
            <input
              name='datePlanted'
              type='date'
              value={formValues.datePlanted}
              onChange={onChange} 
              />
          </label>
          <div className='wateringSchedule'>
            <h3>Watering Schedule</h3>
            <h5>Am I watered Daily, Weekly, Biweekly, or Monthly?</h5>
            <div className='errors'>{formErrors.frequency}</div>
            <label>
              Daily
              <input
                name='frequency'
                type='radio'
                value='daily'
                checked={formValues.frequency === 'daily'}
                onChange={onChange} 
                onClick={() => dayReset()}
                />
            </label>
            <label>
              Weekly
              <input
                name='frequency'
                type='radio'
                value='weekly'
                checked={formValues.frequency === 'weekly'}
                onChange={onChange} 
                />
            </label>
            <label>
              Biweekly
              <input
                name='frequency'
                type='radio'
                value='biweekly'
                checked={formValues.frequency === 'biweekly'}
                onChange={onChange} 
                />
            </label>
            <label>
              Monthly
              <input
                name='frequency'
                type='radio'
                value='monthly'
                checked={formValues.frequency === 'monthly'}
                onChange={onChange} 
              />
            </label>
            <DayConditional formValues={formValues} dayValues={dayValues} dayChange={dayChange} />
          </div>
          <label>
            <h3>Additional Care Instructions</h3>
            <input
              name='careInstructions'
              type='text'
              value={formValues.careInstructions}
              placeholder='Ex: Fertilize monthly'
              onChange={onChange} 
            />
          </label>
          <br/>
          <button disabled={disabled}>Submit</button>
        </form>
             </div>
        )}
      </Spring>
    </div>
    
  )
}