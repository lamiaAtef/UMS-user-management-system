import React, { createContext, useState, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type UserData = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  age: numb;
  birthDate: string;
  phone: string;
  image: string;
};

type UserContextType = {
  userData: UserData | null; // ✅ الاسم مطابق
  saveUserData: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const saveUserData = () => {
    console.log("saveUserData");
    let encodedToken = localStorage.getItem("userToken");

    if (encodedToken) {
      const decodedToken: any = jwtDecode(encodedToken);
      console.log(decodedToken);

      // لو عايزة تحفظي الداتا في الـ state
      setUserData(decodedToken);

      console.log("✅ Context شغال تمام");
    } else {
      console.log("⚠️ مفيش userToken في localStorage");
    }
  };

  return (
    <UserContext.Provider value={{ userData, saveUserData }}>
      {children}
    </UserContext.Provider>
  );
};
