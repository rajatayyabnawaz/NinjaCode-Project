import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const redIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const Home = () => {
  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [locationList, setLocationList] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          const newLocation = `${latitude}, ${longitude}`;
          setLocationList((prevList) => [...prevList, newLocation]);
        },
        (error) => {
          setErrorMessage("Error retrieving your location");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  
  const generateRandomRestaurants = () => {
    const sampleRestaurants = [
      { name: 'Pasta Palace', address: '1234 Food St', rating: (Math.random() * 5).toFixed(1) },
      { name: 'Burger Haven', address: '5678 Burger Blvd', rating: (Math.random() * 5).toFixed(1) },
      { name: 'Sushi World', address: '910 Sushi Ln', rating: (Math.random() * 5).toFixed(1) },
      { name: 'Pizza Planet', address: '1111 Pizza Way', rating: (Math.random() * 5).toFixed(1) },
      { name: 'Taco Town', address: '2222 Taco Rd', rating: (Math.random() * 5).toFixed(1) }
    ];

    return sampleRestaurants.sort(() => Math.random() - 0.5).slice(0, 3); 
  };

  const findRestaurants = async () => {
    if (!location.latitude || !location.longitude) {
      setErrorMessage('Please get the location first!');
      return;
    }

    try {
      
      const randomRestaurants = generateRandomRestaurants();
      setRestaurants(randomRestaurants);
    } catch (error) {
      setErrorMessage('Error fetching restaurant data.');
    }
  };

  return (
    <div className="container-fluid p-0">
    
      <MapContainer
        center={location.latitude && location.longitude ? [location.latitude, location.longitude] : [20, 0]} 
        zoom={location.latitude && location.longitude ? 13 : 2} 
        style={{ height: '100vh', width: '100%' }} 
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

    
        {location.latitude && location.longitude && (
          <Marker position={[location.latitude, location.longitude]} icon={redIcon}>
          </Marker>
        )}
      </MapContainer>

      
      <div className="container mt-5 position-absolute" 
        style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', width: '80%', zIndex: '1000' }}>
        <h2 className="text-center text-light">Find Restaurants Nearby</h2>
        <div className="input-group my-3">
          <button className="btn btn-primary" onClick={getCurrentLocation}>
            Get Location
          </button>
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <div className="form-group">
          <label htmlFor="location" className="text-light">Your Location:</label>
          <textarea
            id="location"
            className="form-control"
            rows="3"
            value={`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}
            readOnly
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="locationDropdown" className="text-light">Select Location:</label>
          <select id="locationDropdown" className="form-control">
            <option value="">Select Location</option>
            {locationList.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-success my-3" onClick={findRestaurants}>
          Find Restaurants
        </button>

        {restaurants.length > 0 && (
          <div className="mt-4">
            <h4 className="text-light">Nearby Restaurants:</h4>
            <div className="row">
              {restaurants.map((restaurant, index) => (
                <div key={index} className="col-md-4 col-sm-6 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{restaurant.name}</h5>
                      <p className="card-text">{restaurant.address}</p>
                      <p className="card-text">Rating: {restaurant.rating}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
