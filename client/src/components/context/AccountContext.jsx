import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { makeRequest } from "../../helper";

export const AccountContext = createContext({});

const AccountProvider = (props) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const location = useLocation();

  useEffect(() => {
    // get the cookie session details from backend
    const getCookieSession = async () => {
      try {
        let result = await makeRequest("/api/users/account/login", "GET");
        const { user } = result;
        setCurrentUser(user);
      } catch (error) {
        return;
      }
    };
    getCookieSession();
  }, [location]);

  /** Sign in an user */
  const signIn = async (email, password) => {
    const user = { email, password };
    let result = await makeRequest("/api/users/account/login", "POST", user);
    alert(result);
    setTimeout(() => {
      navigate("/start");
      window.location.reload(false);
    }, 1000);
  };

  /** Create a new user account */
  const signUp = async (user) => {
    const { email, firstName, lastName, password } = user;
    const newUser = { email, firstName, lastName, password };
    const logIn = { email, password };
    let result = await makeRequest("/api/users", "POST", newUser);
    alert(result);
    await makeRequest("/api/users/account/login", "POST", logIn);
    setTimeout(() => {
      navigate("/start");
      window.location.reload(false);
    }, 1000);
  };

  /** Sign out an user */
  const signOut = async () => {
    await makeRequest("/api/users/account/logout", "DELETE");
    setCurrentUser(undefined);
    setTimeout(() => {
      navigate("/start");
      window.location.reload(false);
    }, 1000);
  };

  /** Delete a user */
  const deleteUser = async () => {
    let result = await makeRequest(`/api/users/${currentUser.id}`, "DELETE");
    alert(result); // for now it is showing an alert, change style if we have time!
    setTimeout(() => {
      signOut();
      navigate("/start");
      window.location.reload(false);
    }, 1000);
  };

  /** Update user profile */
  const updateProfile = async (updates) => {
    const isAdmin = currentUser.role === "user" ? false : true;
    let body;
    !Boolean(updates.password)
      ? (body = {
          firstName: updates.firstName,
          lastName: updates.lastName,
          email: updates.email,
          profilePic: updates.profilePic,
          bio: updates.bio,
          isAdmin: isAdmin,
        })
      : (body = {
          firstName: updates.firstName,
          lastName: updates.lastName,
          email: updates.email,
          password: updates.password,
          profilePic: updates.profilePic,
          bio: updates.bio,
          isAdmin: isAdmin,
        });
    let response = await makeRequest(
      `/api/users/${currentUser.id}`,
      "PUT",
      body
    );
    alert(response);
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  };

  return (
    <AccountContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        updateProfile,
        deleteUser,
        currentUser,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
export const useAccount = () => useContext(AccountContext);
