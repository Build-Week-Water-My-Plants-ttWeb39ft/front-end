import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './axiosWithAuth';
import { Link } from "react-router-dom";

export const ProtectedPage = () => {

  const [plants, setPlants] = useState([])

  useEffect(() => {
    axiosWithAuth()
    .get("plants")
    .then(req=>{
      setPlants(req.data)
    }).catch(err=>{
      console.log(err);
    })
  },[]);

  // const deletePlant = plant => {
  //   axiosWithAuth()
  //   .delete(`plants/${plant.id}`)
  //   .then(req => {
  //     setPlants(req.data);
  //     window.location.reload();
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  return(
    <div className="plants-container">
      <h1>Your Plants</h1>

      <div className="newPlant">
      <Link to="/Add-plant">
          <button type="button">
            Add Plant
          </button>
      </Link>
      </div>

      <div className="plants">
        {plants.map(plant => (

          <div className="plant">
          <h2>{plant.nickname}</h2>
          <img alt={plant.description}>{plant.image}</img>
          <p>{plant.species}</p>
          <p>{plant.description}</p>
          <p>{plant.datePlanted}</p>
          <p>{plant.frequency}</p>
          <p>{plant.days}</p>
          <p>{plant.careInstructions}</p>
          {/* <button onClick={e => {
            e.stopPropagation();
            deletePlant(plant);
          }}>Delete</button> */}
          </div>

        ))}
      </div>
    </div>
  );

}