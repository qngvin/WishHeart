import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredentail)=>{
        console.log(userCredentail)
        navigate("/heart");
    })
    .catch((err)=>{
        console.log(err)
    })
  };
  return (
    <form onSubmit={signIn}>
      <h1>login</h1>
      <div className="flex flex-col gap-2 w-[400px]">
        {" "}
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login in</button>
      </div>
    </form>
  );
}

export default Sign;
