import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './axiosWithAuth';

export const ProtectedPage = () => {

  const [plants, setPlants] = useState([])

  useEffect(() => {
    axiosWithAuth()
    .get("/plants")
    .then(req=>{
      setPlants(req.data)
    }).catch(err=>{
      console.log(err);
    })
  },[]);

  return(
    <div className="plants-container">
      <h1>Your Plants</h1>

      <div className="plants">
        {plants.map(plant => (
          <div className="plant">
          <h2>{plant.nickname}</h2>
          <img alt={plant.description}>{plant.image}</img>
          <p>{plant.species}</p>
          <p>{plant.description}</p>
          <p>{plant.datePlanted}</p>
          <p>{plant.frequency}</p>
          <p>{plant.careInstructions}</p>
          </div>
        ))}
      </div>
    </div>
  );

}