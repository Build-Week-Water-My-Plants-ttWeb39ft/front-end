import React, { useState } from 'react'

export default function NewPlantForm(Props) {

//Add plant form- Plant post-- Name of plant, h2oFrequency, species, plant image, date planted 
// When to water- string- time of day, or how many times per week. enter a number 1-5. When do you water me? checkboxes m-s. input 1 per day,  Drop down, once per week, every other week, and radio buttons with cases. Form valid-- Jay

  const initialFormValues = {
    plantName: '',
    plantImage:'',
    plantSpecies:'',
    plantDescription:'',
    datePlanted:'',
    wateringSchedule:'',
    careInstructions:'',
  }

  const [formValues, setFormValues] = useState(initialFormValues)

  const onChange = evt => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;

    setFormValues({...formValues, [name]: valueToUse})
  }

  return(
    <form>
      <h2>Add Your New Plant</h2>
      <label>
        <h3>Plant Name</h3>
        <input
          name='plantName'
          type='text'
          value={formValues.plantName}
          onChange={onChange}
        />
      </label>
      <br/>
      <label>
        <h3>Plant Image</h3>
        <input
          name='plantImage'
          type='file'
          // value={formValues.plantSpecies}
          // onChange={onChange} 
        />
      </label>
      <br/>
      <label>
        <h3>Plant Species</h3>
        <input
          name='plantSpecies'
          type='text'
          value={formValues.plantSpecies}
          onChange={onChange} 
        />
      </label>
      <br/>
      <label>
        <h3>Plant Description</h3>
        <input
          name='plantDescription'
          type='text'
          value={formValues.plantDescription}
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
    </form>
  )
}