import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

// AuthProvider component should accept `children` as a prop
export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("Users");
  const [authUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : undefined
  );

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}  {/* Render children inside the provider */}
    </AuthContext.Provider>
  );
}

export const userAuth = () => useContext(AuthContext);  // Custom hook to access context
