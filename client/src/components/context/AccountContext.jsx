import { createContext, useContext, useEffect, useState } from "react";

export const AccountContext = createContext({});

const AccountProvider = (props) => {
  const [user, setUser] = useState();

  const isLoggedIn = Boolean(user);

  console.log(isLoggedIn); // to be deleted

  useEffect(() => {
    // fetch GET /api/user
    // setUser
  });

  const login = (username, password) => {
    // fetch
    // setUser
  };

  const signup = (user) => {
    // fetch
  };

  return (
    <AccountContext.Provider value={{ isLoggedIn, login }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
export const useAccount = () => useContext(AccountContext);
