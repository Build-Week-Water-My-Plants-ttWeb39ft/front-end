import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from './axiosWithAuth';
import { Link, useHistory } from "react-router-dom";
import "./protected.css"

export const ProtectedPage = () => {

  const {push} = useHistory();

  const [plants, setPlants] = useState([]);

  const getUser = () => {
    axiosWithAuth()
    .get('users/getuserinfo')
    .then(res => {
      console.log(res.data)
      localStorage.setItem('user:id', res.data.userid)
    }).catch(err => {
      console.log(err)
    })
  }

  const id = localStorage.getItem("user:id")

  const getPlants = () => {
    axiosWithAuth()
    .get(`users/user/${id}`)
    .then(req=>{
      setPlants(req.data.plants)
    }).catch(err=>{
      console.log(err);
    })
  }

  const deletePlant = plant => {
    axiosWithAuth()
    .delete(`plants/plant/${plant.plantid}`)
    .then(req => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getUser();
    getPlants();
  },[]);

  // const routeToItem = (e, plant) => {
  //   e.preventDefault();
  //   history.push(`/Edit-plant/${plant.id}`)
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
          <img src={plant.image} />
          <p>Species: {plant.species}</p>
          <p>Description: {plant.description}</p>
          <p>Date Planted: {plant.datePlanted}</p>
          <p>Water Frequency: {plant.frequency}</p>
          <p>Days: {plant.days}</p>
          <p>Care Instructions: {plant.careInstructions}</p>
          <button onClick={e => {
            e.stopPropagation();
            deletePlant(plant);
          }}>Delete</button>
          <button onClick={() => {
            push(`/Edit-plant/${plant.plantid}`);
          }}>Edit</button>
          </div>

        ))}
      </div>
    </div>
  );

}