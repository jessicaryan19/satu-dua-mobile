import { supabase } from '@/lib/supabase';

export const signUpWithOtp = async (email: string, phone: string, name: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        phone: phone,
        options: {
            shouldCreateUser: true,
            data: {
                display_name: name,
            }
        }
    });
    return { data, error };
};

export const signInWithOtp = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: false
        }
    });
    return { data, error };
};

export const verifyOtp = async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: token,
        type: 'email',
    });
    return { data, error };
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw error || new Error("No logged-in user");
  return user;
}