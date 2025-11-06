'use client';
import Navbar from '@/components/layouts/Navbar';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, increment, setDoc } from 'firebase/firestore';
import { auth } from '@/app/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseError } from 'firebase/app';
import { generateFirebaseAuthErrorMessage } from '../lib/ErrorHandler';

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);

  const [user] = useAuthState(auth);

  const router = useRouter();

  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile(cred.user.uid, email);
      console.log('User created with UID:', cred.user.uid);
    } catch (err) {
      console.error('Error creating user:', err);
    }
  }

  async function createUserProfile(uid: string, email: string) {
    await setDoc(doc(db, 'users', uid), {
      email,
      cart: [],
      likes: [],
      createdAt: new Date(),
    });
  }

  //  upon login, turn guest cart into user cart
  const mergeGuestCart = async () => {
    if (!user) return;

    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    for (const item of guestCart) {
      const cartItemRef = doc(db, 'carts', user.uid, 'cartItems', item.id.toString());
      await setDoc(cartItemRef, { quantity: increment(item.quantity) }, { merge: true });
    }

    // clear guest cart
    localStorage.removeItem('guestCart');
  };

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      mergeGuestCart();
      router.push('/');
      console.log('Logged in UID:', cred.user.uid);
    } catch (error) {
      if (error instanceof FirebaseError) {
        generateFirebaseAuthErrorMessage(error);
      }
      console.error('Login error:', error);
    }
  }

  return (
    <>
      <Navbar homePage={true} />
      <main className="bg-background-light relative flex min-h-screen">
        <section className="flex flex-col grow p-20">
          <div className="flex flex-col grow shadow-md p-12 text-primary-light bg-white border-gray-400/25 border-1">
            <header className="flex-1">
              <h1 className="text-3xl font-bold text-secondary-light">JSHOP</h1>
            </header>
            <form onSubmit={isRegistered ? login : register} className="flex-7 flex flex-col gap-4">
              <p className="text-xl">Welcome Back!</p>
              <h1 className="text-5xl font-bold">{isRegistered ? 'Sign In' : 'Sign Up'}</h1>
              <InputField label="Email:" id="email" onChange={(e) => setEmail(e.target.value)} />
              <InputField
                type="password"
                label="Password:"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="bg-secondary-light w-fit p-2 text-white rounded-sm flex justify-center font-semibold">
                {isRegistered ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>
            <div>
              <p>
                {isRegistered ? 'Need an Account?' : 'Already have an account?'}{' '}
                <Button
                  className="text-secondary-light"
                  onClick={() => setIsRegistered(!isRegistered)}>
                  {isRegistered ? 'Register' : 'Sign In'} here
                </Button>
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
