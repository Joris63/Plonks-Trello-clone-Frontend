import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshTokens";
import LoadingPage from "../helpers/LoadingPage";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <LoadingPage /> : <Outlet />}</>;
};

export default PersistLogin;
