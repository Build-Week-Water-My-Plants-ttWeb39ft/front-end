import React, { useState } from 'react'

export default function NewPlantForm(Props) {

//Add plant form- Plant post-- Name of plant, h2oFrequency, species, plant image, date planted 
// When to water- string- time of day, or how many times per week. enter a number 1-5. When do you water me? checkboxes m-s. input 1 per day,  Drop down, once per week, every other week, and radio buttons with cases. Form valid-- Jay

//Monthly, bi-weekly, weeekly, daily
//what days in  a string


  const initialFormValues = {
    nickname: '',
    image:'',
    species:'',
    description:'',
    datePlanted:'',
    frequency:'',
    days:'',
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
          name='nickname'
          type='text'
          value={formValues.nickname}
          onChange={onChange}
        />
      </label>
      <br/>
      <label>
        <h3>Plant Image</h3>
        <input
          name='image'
          type='file'
          value={formValues.image}
          accept='image/png, image/jpeg, image/gif'
          onChange={onChange} 
        />
      </label>
      <br/>
      <label>
        <h3>Plant Species</h3>
        <input
          name='species'
          type='text'
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
        <h4>Am I watered Daily, Weekly, Biweekly, or Monthly?</h4>
        <label>
          Daily
          <input
            name='frequency'
            type='radio'
            value='daily'
            onChange={onChange} 
          />
        </label>
        <label>
          Weekly
          <input
            name='frequency'
            type='radio'
            value='weekly'
            onChange={onChange} 
          />
        </label>
        <label>
          Biweekly
          <input
            name='frequency'
            type='radio'
            value='biweekly'
            onChange={onChange} 
          />
        </label>
        <label>
          Monthly
          <input
            name='frequency'
            type='radio'
            value='monthly'
            onChange={onChange} 
          />
        </label>
      </div>
      <label>
        <h3>Additional Care Instructions</h3>
        <input
          name='careInstructions'
          type='text'
          value={formValues.careInstructions}
          onChange={onChange} 
        />
      </label>
      <button>Submit</button>
    </form>
  )
}