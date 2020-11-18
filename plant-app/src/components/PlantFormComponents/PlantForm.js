import React from 'react'
import DayConditional from './DayConditional'


export default function PlantForm(props) {

  const { submit, formValues, formValueChange, formErrors, dayValues, disabled, dayChange, dayReset} = props;

  const onChange = evt => {
    const { name, value, type, checked } = evt.target;
    const valueToUse = type === 'checkbox' ? checked : value;
    formValueChange(name, valueToUse);
  }
  const onSubmit = evt => {
    evt.preventDefault();
    submit();
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
                checked={formValues.frequency === 'Monthly'}
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
  )
}