import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import { useGenerateJwtMutation } from "../redux/api/usersApi/usersApi";

export const useAuth = () => {
  const [generateJwt, { isLoading }] = useGenerateJwtMutation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user);

        if (user && user.email) {
          generateJwt(user.email)
            .unwrap()
            .then((res) => {
              console.log("JWT token response", res);
              
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
            });
          console.log("user", user);
        } else {
          console.log("user email not found");
          setLoading(false);
        }

        // ...
      } else {
        // User is signed out
        // ...
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [generateJwt]);

  return { user, loading };
};
