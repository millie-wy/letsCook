import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../helper";

export const AccountContext = createContext({});

const AccountProvider = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const isLoggedIn = Boolean(user);

  useEffect(() => {
    const getCookieSession = async () => {
      try {
        let result = await makeRequest("/api/users/account/login", "GET");
        setUser(result);
      } catch (error) {
        return;
      }
    };
    getCookieSession();
  }, []);

  const signIn = async (email, password) => {
    const user = { email, password };
    console.log(user); // to be deleted
    let result = await makeRequest("/api/users/account/login", "POST", user);
    alert(result); // for now it is showing an alert, change style if we have time!
    setTimeout(() => {
      navigate("/start");
      window.location.reload(false);
    }, 1000);
  };

  const signUp = async (user) => {
    const { email, firstName, lastName, password } = user;
    const newUser = { email, firstName, lastName, password };
    console.log(newUser); // to be deleted
    let result = await makeRequest("/api/users", "POST", newUser);
    alert(result); // for now it is showing an alert, change style if we have time!
    setTimeout(() => {
      navigate("/start");
    }, 1000);
  };

  const signOut = async () => {
    let result = await makeRequest("/api/users/account/logout", "DELETE");
    alert(result); // for now it is showing an alert, change style if we have time!
    setTimeout(() => {
      navigate("/start");
      window.location.reload(false);
    }, 1000);
  };

  return (
    <AccountContext.Provider
      value={{ isLoggedIn, signIn, signUp, signOut, user }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
export const useAccount = () => useContext(AccountContext);
