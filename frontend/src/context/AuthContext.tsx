


// Version 1


// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext<any>(null);

// export const AuthProvider = ({ children }: any) => {
//   const [user, setUser] = useState<any>(null);
//   const [token, setToken] = useState<string | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");

//     if (storedUser) setUser(JSON.parse(storedUser));
//     if (storedToken) setToken(storedToken);
//   }, []);

//   const login = (data: any) => {
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));

//     setUser(data.user);
//     setToken(data.token);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// Version 2 : Updated Version 1


import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   const storedToken = localStorage.getItem("token");

  //   if (storedUser) setUser(JSON.parse(storedUser));
  //   if (storedToken) setToken(storedToken);
  // }, []);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

  if (storedToken) {
    setToken(storedToken);
  }

  setIsLoading(false);
}, []);

  const login = (data: any) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
    setToken(data.token);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);