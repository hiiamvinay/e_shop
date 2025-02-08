import React, { createContext, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState('Select Location'); // State to manage the selected location
  const locations = ['Jaipur', 'Ajmer', 'Mahapura', 'Mumbai', 'Bhopal']; 
  return (
    <LocationContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        locations,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
