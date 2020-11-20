import React from 'react';

export default function DayConditional(props) {

  const { formValues, dayValues, dayChange } = props;

  const onChangeDays = evt => {
    const { name, checked } = evt.target;
    dayChange(name,checked);
  }


  if (formValues.frequency === 'monthly' || formValues.frequency === 'biweekly'|| formValues.frequency === 'weekly'){
    return (
      <div className='dayConditional'>
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
  } else {return ''}
}