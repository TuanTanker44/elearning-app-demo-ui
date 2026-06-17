import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  function login(userData) {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);

    localStorage.removeItem("user");
  }

  function updateUser(updatedUser) {
    setUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
