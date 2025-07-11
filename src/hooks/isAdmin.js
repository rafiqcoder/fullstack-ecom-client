import React from "react";
import { useAuth } from "./auth";
import { useGetAdminMutation } from "../redux/api/usersApi/usersApi";

export const useIsAdmin = () => {
  const [getAdmin, { isLoading, error }] = useGetAdminMutation();
  const { user, loading } = useAuth();
  const [adminLoading, setAdminLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  // Assuming useAuth is defined in auth.js
  React.useEffect(() => {
    if (!loading && user) {
      getAdmin(user.email)
        .unwrap()
        .then((response) => {
          console.log("Admin status response:", response);
          setAdminLoading(false);
          setIsAdmin(response.isAdmin);
        })
        .catch((error) => {
          console.error("Failed to fetch admin status:", error);
          setAdminLoading(false);
          setIsAdmin(false);
        });

      setIsAdmin(user.isAdmin);
    }
  }, [getAdmin, loading, user]);

  if (error) {
    console.error("Error fetching admin status:", error);
    setAdminLoading(false);
    setIsAdmin(false);
  }

  const isAdminLoading = loading || isLoading || adminLoading;

  return { isAdmin, isAdminLoading };
};
