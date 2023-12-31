import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Guest from "./Guest";
import Sign from "./Sign";
import Heart from "./Heart";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/heart" /> : <Guest />}
        />
        <Route path="/heart" element={user ? <Heart /> : <Navigate to="/" />} />
        <Route path="/login" element={<Sign />} />
      </Routes>
    </div>
  );
}

export default App;
