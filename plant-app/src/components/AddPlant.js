import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import schema from './validation/newPlantSchema'
import axios from 'axios'

export default function NewPlantForm(Props) {

//Add plant form- Plant post-- Name of plant, h2oFrequency, species, plant image, date planted 
// When to water- string- time of day, or how many times per week. enter a number 1-5. When do you water me? checkboxes m-s. input 1 per day,  Drop down, once per week, every other week, and radio buttons with cases. Form valid-- Jay

//Monthly, bi-weekly, weeekly, daily
//what days in  a string

//required Name, species, frequency,

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
  const onChange = evt => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    validate(name, valueToUse);
    setFormValues({...formValues, [name]: valueToUse})
    
  }

  const onChangeDays = evt => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    setDayValues({...dayValues, [name]: valueToUse})
    
  }

  const onSubmit = evt => {
    evt.preventDefault();
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

  const dayConditional = () => {
    if (formValues.frequency === 'monthly' || formValues.frequency === 'biweekly'|| formValues.frequency === 'weekly'){
      return (
        <div>
        <h5>What days of the week am I watered?</h5>
        <label>
          Monday
          <input
            name='monday'
            type='checkbox'
            checked={dayValues.monday}
            onChange={onChangeDays} 
            />
        </label>
        <label>
          Tuesday
          <input
            name='tuesday'
            type='checkbox'
            checked={dayValues.tuesday}
            onChange={onChangeDays} 
            />
        </label>
        <label>
          Wednesday
          <input
            name='wednesday'
            type='checkbox'
            checked={dayValues.wednesday}
            onChange={onChangeDays} 
            />
        </label>
        <label>
          Thursday
          <input
            name='thursday'
            type='checkbox'
            checked={dayValues.thursday}
            onChange={onChangeDays} 
          />
        </label>
        <label>
          Friday
          <input
            name='friday'
            type='checkbox'
            checked={dayValues.friday}
            onChange={onChangeDays} 
          />
        </label>
        <label>
          Saturday
          <input
            name='saturday'
            type='checkbox'
            checked={dayValues.saturday}
            onChange={onChangeDays} 
          />
        </label>
        <label>
          Sunday
          <input
            name='sunday'
            type='checkbox'
            checked={dayValues.sunday}
            onChange={onChangeDays} 
          />
        </label>
        </div>
      )
    } 
    // else {setFormValues({...formValues, [monday]: false, [tuesday]: false, [wednesday]: false, [thursday]: false, [friday]: false, [saturday]: false, [sunday]: false})}
    // else {setFormValues({...formValues, [arr]: false})}
  }


  return(
    <form onSubmit={onSubmit}>
      <h2>Add {formValues.nickname !== '' ? `${formValues.nickname}` : 'Your New Plant'} {formValues.species !== '' ? `the ${formValues.species}! 🎉` : ''}</h2>
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
      <br/>
      <label>
        <h3>Plant Image</h3>
        {formValues.image !== '' ? (<div class='plantImage'><img src={formValues.image} alt='Your plant!' /> <br/></div>) : ''}
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
      <br/>
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
      <br/>
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
      <div class='wateringSchedule'>
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
            onClick={() => setDayValues(initialDayValues)}
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
            checked={formValues.frequency === 'Monthly'}
            onChange={onChange} 
          />
        </label>
        {dayConditional()}
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
  )
}