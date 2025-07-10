import {createContext, useContext, useEffect} from "react";
// import {getCurrentUser} from "@/DB/ApiAuth";
import {getCurrentUser} from "../src/DB/ApiAuth";
import useFetch from "@/components/Hooks/use-fetch";

const UrlContext = createContext();

const UrlProvider = ({children}) => {
  const {data: user, loading, fn: fetchUser} = useFetch(getCurrentUser);

  const isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UrlContext.Provider value={{user, fetchUser, loading, isAuthenticated}}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;