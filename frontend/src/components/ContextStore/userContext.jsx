import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const[ready, setReady] = useState(false);
 const[destination, setDestination] = useState('');

  useEffect(() => {
    if(!user){
      axios.get('/auth/profile').then(({data})=>{
        setUser(data);
        setReady(true);// ready true tb hoga jb user data aa jayega
      })
    }
  },[])
  return (
    <UserContext.Provider value={{ user, setUser, ready, destination, setDestination }}>
      {children}
    </UserContext.Provider>
  );
};
