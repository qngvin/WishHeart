import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

function Heart() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return (
    <div>
      <h1>Hi there!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Heart;
