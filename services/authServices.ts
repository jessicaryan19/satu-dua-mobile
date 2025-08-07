import { supabase } from '@/lib/supabase';

export const signInWithOtp = async (phone: string ) => {
  const { data, error } = await supabase.auth.signInWithOtp({ phone });
  return { data, error };
};

export const verifyOtp = async (phone: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: 'sms',
  });
  return { data, error };
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
