import React, {useState} from 'react';
import PlantManager from './PlantFormComponents/PlantManager';
import { initialFormValues, initialDayValues } from './PlantFormComponents/initialValues'
import { axiosWithAuth } from './axiosWithAuth';
import { useHistory } from 'react-router-dom';


  // const initialFormValues = {
  //   nickname: "",
  //   image: "",
  //   species: "",
  //   description: "",
  //   datePlanted: "",
  //   frequency: "",
  //   careInstructions: "",
  // }

 function AddPlant() {
  const { push } = useHistory();
  const [formValues, setFormValues] = useState(initialFormValues);

  const postPlant = newPlant => {
    axiosWithAuth()
      .post('plants/plant', newPlant)
      .then(res => {
        push("/My-plants")
        console.log('Success:',res)
      })
      .catch(err => {
        console.log('Error:',err)
      })
  }

  return(
    <div>
      <PlantManager 
      mailPlant={postPlant} 
      formValues={formValues}
      setFormValues={setFormValues}
      initialFormValues={initialFormValues} 
      initialDayValues={initialDayValues} 
      mailType='post' />
    </div>
  )
}

export default AddPlant;