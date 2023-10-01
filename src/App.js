import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({ name: '', address: '' });

  useEffect(() => {
    axios.get('/restaurants')
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleRestaurantInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: value,
    }));
  };

  const createRestaurant = () => {
    axios
      .post('/add-restaurant', newRestaurant)
      .then((response) => {
        setRestaurants([...restaurants, response.data]);
        setNewRestaurant({ name: '', address: '' });
      })
      .catch((error) => {
        console.error('Error creating restaurant:', error);
      });
  };

  const deleteRestaurant = (id) => {
    axios
      .delete(`/restaurants/${id}`)
      .then(() => {
        const updatedRestaurants = restaurants.filter((restaurant) => restaurant.id !== id);
        setRestaurants(updatedRestaurants);
      })
      .catch((error) => {
        console.error('Error deleting restaurant:', error);
      });
  };

  return (
    <div>
      <h1>Pizza Restaurants</h1>
      <h2>Create a New Restaurant</h2>
      <div>
        <input
          type="text"
          name="name"
          className='inputform'
          placeholder="Name"
          value={newRestaurant.name}
          onChange={handleRestaurantInputChange}
        />
        <input
          type="text"
          name="address"
          className='inputform'
          placeholder="Address"
          value={newRestaurant.address}
          onChange={handleRestaurantInputChange}
        />
        <button className='create' onClick={createRestaurant}>Create</button>
      </div>
      <ul>
        {restaurants.map((restaurant) => (
          <span key={restaurant.id}>
            <h2>{restaurant.name}</h2><p>{restaurant.address}</p>
            <button className='delete' onClick={() => deleteRestaurant(restaurant.id)}>Delete</button>
          </span>
        ))}
      </ul>
      
    </div>
  );
}

export default App;
