import React, { useEffect, useState } from 'react'

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
    days:[],
    careInstructions:'',
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  }

  const [formValues, setFormValues] = useState(initialFormValues)

  const onChange = evt => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    setFormValues({...formValues, [name]: valueToUse})
  }

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
            onChange={onChange} 
            />
        </label>
        <label>
          Tuesday
          <input
            name='tuesday'
            type='checkbox'
            onChange={onChange} 
            />
        </label>
        <label>
          Wednesday
          <input
            name='wednesday'
            type='checkbox'
            onChange={onChange} 
            />
        </label>
        <label>
          Thursday
          <input
            name='thursday'
            type='checkbox'
            onChange={onChange} 
          />
        </label>
        <label>
          Friday
          <input
            name='friday'
            type='checkbox'
            onChange={onChange} 
          />
        </label>
        <label>
          Saturday
          <input
            name='saturday'
            type='checkbox'
            onChange={onChange} 
          />
        </label>
        <label>
          Sunday
          <input
            name='sunday'
            type='checkbox'
            onChange={onChange} 
          />
        </label>
        </div>
      )
    } 
    // else {setFormValues({...formValues, [monday]: false, [tuesday]: false, [wednesday]: false, [thursday]: false, [friday]: false, [saturday]: false, [sunday]: false})}
    // else {setFormValues({...formValues, [arr]: false})}
  }

  // useEffect(()=> {
  //   if (formValues.frequency === 'monthly' || formValues.frequency === 'biweekly'|| formValues.frequency === 'weekly'){
  //     return dayConditional()
  //   } else {
      
  //   }
  // },[formValues.frequency])

  return(
    <form>
      <h2>Add {formValues.nickname !== '' ? `${formValues.nickname}` : 'Your New Plant'} {formValues.species !== '' ? `the ${formValues.species}! 🎉` : ''}</h2>
      <label>
        <h3>Plant Name</h3>
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
          placeholder='Ex: Gift from Helen at foyer'
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
      <button>Submit</button>
    </form>
  )
}