import { useState, useCallback, useEffect } from 'react';
import type { AuthState } from '@/types';
import { supabase } from '@/lib/supabase';

const AUTH_KEY = 'jb_auth_state';

function getInitialState(): AuthState {
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    isAuthenticated: false,
    hasAccess: false,
    phoneNumber: null,
    email: null,
    accessLevel: 'public',
  };
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(getInitialState);

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  }, [auth]);

  const authenticate = useCallback((email: string, accessLevel: string) => {
    setAuth({
      isAuthenticated: true,
      hasAccess: true,
      phoneNumber: null,
      email,
      accessLevel: accessLevel as AuthState['accessLevel'],
    });
  }, []);

  const loginWithEmail = useCallback((email: string) => {
    setAuth({
      isAuthenticated: true,
      hasAccess: true,
      phoneNumber: null,
      email,
      accessLevel: 'client',
    });
  }, []);

  const logout = useCallback(() => {
    setAuth({
      isAuthenticated: false,
      hasAccess: false,
      phoneNumber: null,
      email: null,
      accessLevel: 'public',
    });
    localStorage.removeItem(AUTH_KEY);
  }, []);

  const submitLead = useCallback(async (data: {
    name: string;
    email: string;
    intent: string;
    mode: string;
    newsletter: boolean;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.from('leads').insert({
        name: data.name,
        email: data.email,
        intent: data.intent,
        mode: data.mode,
        newsletter: data.newsletter,
        source: 'jonoblackburn.com',
      });

      if (error) {
        console.error('Supabase insert error:', error);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      console.error('Submit lead error:', err);
      return { success: false, error: err.message };
    }
  }, []);

  return { auth, authenticate, loginWithEmail, logout, submitLead };
}
