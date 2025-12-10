import React, { createContext, useEffect, useState } from "react";
import { app } from "../firebase.config";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const api = axios.create({
  baseURL: import.meta.env.VITE_apiBaseUrl,
  withCredentials: true,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user (name, photoURL optional)
  const createUser = (email, password, name, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (result) => {
        // profile update
        if (name || photoURL) {
          await updateProfile(result.user, {
            displayName: name || result.user.displayName,
            photoURL: photoURL || result.user.photoURL,
          });
        }
        return result;
      }
    );
  };

  // update user profile
  const updateUserProfile = (name, photoURL) => {
    if (!auth.currentUser) return Promise.resolve();
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL,
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      return api
        .post("/api/auth/logout")
        .catch(() => {})
        .finally(() => {
          setRole(null);
          setLoading(false);
        });
    });
  };

  // firebase user → backend JWT cookie sync
  const syncJWT = async (firebaseUser) => {
    if (!firebaseUser) return;
    const payload = {
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    };
    const res = await api.post("/api/auth/jwt", payload);
    setRole(res.data.role);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          await syncJWT(currentUser);
        } catch (err) {
          console.error("JWT sync error:", err);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    role,
    loading,
    createUser,
    signIn,
    signInWithGoogle,  
    googleSignIn: signInWithGoogle, 
    updateUserProfile,     
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
