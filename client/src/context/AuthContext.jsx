import React, {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {

    return JSON.parse(
      localStorage.getItem("wanderly_user") || "null"
    );

  });

  const login = (email, password) => {

    const users = JSON.parse(
      localStorage.getItem("wanderly_users") || "[]"
    );

    const found = users.find(
      user =>
        user.email === email &&
        user.password === password
    );

    if (!found) {
      throw new Error(
        "Invalid email or password"
      );
    }

    setUser(found);

    localStorage.setItem(
      "wanderly_user",
      JSON.stringify(found)
    );
  };

  const register = data => {

    const users = JSON.parse(
      localStorage.getItem("wanderly_users") || "[]"
    );

    if (
      users.some(
        user => user.email === data.email
      )
    ) {
      throw new Error(
        "Email already registered"
      );
    }

    users.push(data);

    localStorage.setItem(
      "wanderly_users",
      JSON.stringify(users)
    );

    setUser(data);

    localStorage.setItem(
      "wanderly_user",
      JSON.stringify(data)
    );
  };

  const logout = () => {

    setUser(null);

    localStorage.removeItem(
      "wanderly_user"
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthContext);