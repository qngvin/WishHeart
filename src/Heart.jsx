import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";

function Heart() {
  const navigate = useNavigate();
  const [hearts, setHearts] = useState([]);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const heartArray = Object.values(data);
        setHearts(heartArray);
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe when the component is unmounted
  }, []); // Dependency array rỗng để đảm bảo useEffect chỉ chạy một lần khi component được render

  return (
    <div>
      <h1>Hi there!</h1>
      {hearts.map((heart) => (
        <div key={heart.uuid}>
          <p>{heart.heart}</p>
        </div>
      ))}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Heart;
