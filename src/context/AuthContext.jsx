import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); 
        console.log("Bruker logget inn:", userData);
      };
    
      const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        console.log("bruker logget ut");
      };

      useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            console.log("Bruker hentet fra localStorage", JSON.parse(storedUser));
          setUser(JSON.parse(storedUser));
        } else {
            console.log("ingen bruker funnet i localStorage");
        }
      }, []);

      console.log("Bruker fra AuthContext", user)
    

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
