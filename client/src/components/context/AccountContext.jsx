import { createContext, useContext, useState } from "react";

export const AccountContext = createContext({});

const AccountProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn); // to be deleted

  return (
    <AccountContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
export const useAccount = () => useContext(AccountContext);
