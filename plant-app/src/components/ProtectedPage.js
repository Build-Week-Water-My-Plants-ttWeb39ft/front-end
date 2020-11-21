import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "./axiosWithAuth";
import { Link, useHistory } from "react-router-dom";
import "./protected.css";

export const ProtectedPage = () => {
  const { push } = useHistory();

  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const getUser = () => {
      axiosWithAuth()
        .get("users/getuserinfo")
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("user:id", res.data.userid);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();

    const id = localStorage.getItem("user:id");

    const getPlants = () => {
      axiosWithAuth()
        .get(`users/user/${id}`)
        .then((req) => {
          // console.log(req);
          // console.log(id);
          setPlants(req.data.plants);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPlants();
  }, []);

  const deletePlant = (plant) => {
    axiosWithAuth()
      .delete(`plants/plant/${plant.plantid}`)
      .then((req) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   getUser();
  //   getPlants();
  // },[]);

  const logout = () => {
    axiosWithAuth()
      .post("/logout")
      .then((req) => {
        console.log(req);
        localStorage.removeItem("token");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="plants-container">
      <h1>My Plants</h1>

      <div className="newPlant">
        <Link to="/Add-plant">
          <button type="button">Add Plant</button>
        </Link>
      </div>

      <div className="plants">
        {plants.map((plant) => (
          <div className="plant">
            <h2>{plant.nickname}</h2>
            <img src={plant.image} alt={plant.nickname ?? "plant"}  />
            <p>Species: {plant.species}</p>
            <p>Description: {plant.description}</p>
            <p>Date Planted: {plant.datePlanted}</p>
            <p>Water Frequency: {plant.frequency}</p>
            <p>Days: {plant.days}</p>
            <p>Care Instructions: {plant.careInstructions}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deletePlant(plant);
              }}
            >
              Delete
            </button>

            <button
              onClick={() => {
                push(`/Edit-plant/${plant.plantid}`);
              }}
            >
              Edit
            </button>
            {/* <Link to={`/Edit-plant/${plant.plantid}`}>Edit</Link> */}
          </div>
        ))}
      </div>

      <Link to="/">
        <button onClick={logout}>Logout</button>
      </Link>
    </div>
  );
};
