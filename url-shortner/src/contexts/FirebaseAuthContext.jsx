import { firebaseApp } from "../utils/FirebaseApp";
import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { addUserToDB } from "../utils/addUserToDB";
import { toast } from "react-hot-toast";

const firebaseAuth = getAuth(firebaseApp);

const FirebaseAuthContext = createContext();

const FirebaseAuthContextProvider = ({ children }) => {
  const [logedInUser, setLogedInUser] = useState(null);

  const registerUserWithEmailAndPassword = async (email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      if (user) {
        const { uid } = user.user;

        toast.success("Registered successfully ✅",{position:'bottom-right'});
        addUserToDB(uid);
      }
    } catch (error) {
      toast.error("Error registering user !",{position:'bottom-right'});
    }
  };

  const loginUserWithEmailAndPassword = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      )
        .then((user) => {
          if (user) {
            toast.success(" Logined successfully ✅",{position:'bottom-right'});
          }
        })
        .catch((error) => {
          console.log("Error login user:", error);
        });
    } catch (error) {
      toast.error("Wrong Email or Password",{position:'bottom-right'});
    }
  };
  const logOut = async () => {
    await signOut(firebaseAuth)
      .then(() => toast.success("Logout successfully ✅",{position:'bottom-right'}))
      .catch(() => toast.error("Unexpected error !",{position:'bottom-right'}));
  };

  useEffect(() => {
    const logedInUser = onAuthStateChanged(firebaseAuth, (user) => {
      console.log("logedin user:",user)
      setLogedInUser(user);
    });
  }, []);

  return (
    <FirebaseAuthContext.Provider
      value={{
        registerUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        logedInUser,
        logOut,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
export { FirebaseAuthContext, FirebaseAuthContextProvider };
