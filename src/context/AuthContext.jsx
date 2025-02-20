import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext(); 
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); 
      };
    
      const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
      };

      useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) { 
          const parsedUser = JSON.parse(storedUser);
            console.log("Bruker hentet fra localStorage", JSON.parse(storedUser));

          const cleanedUser = {
            email: parsedUser.email,
            name: parsedUser.name,
            role: parsedUser.role,
        };

        setUser(cleanedUser);
    
        } else {
           console.log("ingen brukere funnet i local storage");
        }
        setLoading(false);
      }, []);
    

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
