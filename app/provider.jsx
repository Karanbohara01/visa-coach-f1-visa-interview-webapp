


'use client';

import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient';
import { useContext, useEffect, useState } from 'react';

function Provider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    try {
      // Fetch the authenticated user
      const { data: authUser, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('Error fetching authenticated user:', authError);
        return;
      }

      const user = authUser?.user;
      if (!user) {
        console.error('No authenticated user found');
        return;
      }

      // Check if the user already exists
      const { data: users, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', user?.email);

      if (fetchError) {
        console.error('Error fetching user data:', fetchError);
        return;
      }

      if (users?.length === 0) {
        // Create a new user if none exists
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert([
            {
              name: user?.user_metadata?.name,
              picture: user?.user_metadata?.picture, // Fix the typo here
              email: user?.email,
            },
          ]);

        if (insertError) {
          console.error('Error creating new user:', insertError);
          return;
        }

        console.log('New user created:', newUser);
        setUser(newUser[0]); // Set the created user
      } else {
        console.log('User already exists:', users[0]);
        setUser(users[0]); // Set the existing user
      }
    } catch (error) {
      console.error('Error in CreateNewUser:', error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error('useUser must be used within a Provider');
  }
  return context;
};
