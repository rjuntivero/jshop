// useAuth.ts
'use client';
import { useState, useEffect } from 'react';
import { auth } from '@/app/firebaseConfig';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export const useAuth = () => {
  const [user, setUser] = useState<FirebaseUser | null | undefined>(auth.currentUser ?? undefined);
  const [loading, setLoading] = useState(user === undefined);

  // useEffect to prevent multiple listeners
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setLoading(false);
    });

    // cleanup
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      return true;
    } catch (err) {
      console.error('Logout error:', err);
      return false;
    }
  };

  return { user, loading, logout };
};
