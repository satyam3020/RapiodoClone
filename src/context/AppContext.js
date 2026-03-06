import React, { createContext, useState } from 'react';
import { translations } from '../utils/translations';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Global State
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'
  const [user, setUser] = useState(null); // null means not logged in
  const [role, setRole] = useState(null); // 'user' or 'driver'
  const [location, setLocation] = useState(null);

  // Simulated Ride State
  const [activeRide, setActiveRide] = useState(null);
  const [incomingRequests, setIncomingRequests] = useState([]);

  // Driver Stats
  const [driverStats, setDriverStats] = useState({
    totalRides: 0,
    earnings: 0,
    acceptCount: 0,
    declineCount: 0
  });

  // Translation Function
  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language, setLanguage, t,
    user, setUser,
    role, setRole,
    location, setLocation,
    activeRide, setActiveRide,
    incomingRequests, setIncomingRequests,
    driverStats, setDriverStats
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
