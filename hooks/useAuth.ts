"use client";

import {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { auth, fs_database } from "@/utils/firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";

// Define types for AuthContext
interface AuthContextType {
  user: FirebaseUser | null;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode; // Fix the ReactNode typing here for children prop
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

// AuthProvider component to wrap around your app
// export function AuthProvider({ children }: AuthProviderProps) {
//   const auth = useProvideAuth();
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// }

// useAuth hook to access the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Custom hook to handle authentication logic
function useProvideAuth(): AuthContextType {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(fs_database, "users", user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(fs_database, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            isAdmin: false, // Default to non-admin
            createdAt: new Date(),
          });
        }
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoading,
  };
}
