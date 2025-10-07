import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

interface DecodedToken {
  exp?: number;
}

export const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get("accessToken");

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode<DecodedToken>(token);

        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Token inválido:", error);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  return { isAuthenticated, isLoading };
};
