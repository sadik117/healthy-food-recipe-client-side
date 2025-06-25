import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile } from "firebase/auth";
import app from "../firebase.config";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = ( email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userUpdate = (updatedData) =>{
    return updateProfile(auth.currentUser, updatedData);
  }

  const signIn = (email, password) =>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  const googleSignIn = () => {
      return signInWithPopup(auth, provider);
  }

  const logOut = () =>{
    signOut(auth);
    toast.success("Signout successful!!")
  }

  useEffect(()=>{
    const unSubscribe = onAuthStateChanged (auth,(currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
          return () => {
            unSubscribe();
          };
  }, []);


  const forgotPass = (user, newPassword) => {
      return updatePassword(user, newPassword);  
  }

  const authData = {
    user,
    setUser,
    createUser,
    signIn,
    logOut,
    loading,
    setLoading,
    userUpdate,
    googleSignIn,
    forgotPass
  };
  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
