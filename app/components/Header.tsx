"use client";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const Header = () => {
  const session = useSession();

  useEffect(() => {
    if (session.data?.user.idToken) {
      const decode = jwtDecode(session.data.user.idToken);
    }
  }, [session]);
  return (
    <div>
      <h1>This is header</h1>
    </div>
  );
};
