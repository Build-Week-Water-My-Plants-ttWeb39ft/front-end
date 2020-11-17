import React, { useState } from 'react';
import { axiosWithAuth } from './axiosWithAuth';

export const ProtectedPage = () => {

  const [plants, setPlants] = useState([])

  getData = () => {
    axiosWithAuth()
    .get("/something")
    .then(res => {
      setPlants(res.data)
    }).catch(err => {
      console.log(err)
    })
  }

  return(

    <h1>Hello World</h1>

  );

}