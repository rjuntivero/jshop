'use client';
import Navbar from '@/components/layouts/Navbar';
// import Image from 'next/image';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import React, { useState } from 'react';
import { User } from '@/types/User';

export default function Homepage() {
  const [user, setUser] = useState<User>();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  async function createUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(`/api/users`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    fetchUsers();
    fetchUser();
    console.log(data);
  }

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(`/api/users`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    setUser(data);
    console.log(data);
  }

  async function fetchUsers() {
    const res = await fetch('/api/users');
    const data = await res.json();
    console.log('FETCHED USERS', data);
  }

  async function fetchUser() {
    const res = await fetch(`/api/users/${1}`);
    const data = await res.json();
    console.log('FETCHED SINGLE USER', data);
  }
  return (
    <>
      <Navbar homePage={true} />
      <main className=" bg-background-light relative flex  min-h-screen  ">
        <section className=" flex flex-col grow p-20  ">
          <div className="flex flex-col grow shadow-md p-12 text-primary-light bg-white border-gray-400/25 border-1">
            <header className="flex-1">
              <h1 className="text-3xl font-bold text-secondary-light">JSHOP</h1>
            </header>
            <form onSubmit={createUser} className="flex-7 flex flex-col gap-4">
              <p className="text-xl">Welcome Back!</p>
              <h1 className="text-5xl font-bold">Sign In</h1>
              <InputField label="Email:" id="email" />
              <InputField label="Password:" id="password" />
              <Button className="bg-secondary-light w-fit p-2 text-white rounded-sm flex justify-center font-semibold">
                Sign In
              </Button>
            </form>
            <div>
              <p>
                Need an Account? <Button className="text-secondary-light">Register here</Button>
              </p>
            </div>
          </div>
        </section>
        {/* <Image
          src="./favoriteitem.svg"
          width={400}
          height={400}
          alt="shopping_icon"
          className="right-50 bottom-50 absolute"
        /> */}
      </main>
      {/* <div className="bg-primary-light mb-1 w-full pt-1"></div>

      <Footer /> */}
    </>
  );
}
