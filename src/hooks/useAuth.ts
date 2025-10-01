// useAuth.ts
'use client';
import { auth } from '@/app/firebaseConfig';

export const useAuth = () => {
  const logout = async () => {
    try {
      await auth.signOut();
      return true;
    } catch (err) {
      console.error('Logout error:', err);
      return false;
    }
  };

  return { logout };
};
