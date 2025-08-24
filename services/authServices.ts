import { supabase } from '@/lib/supabase';
import { AuthError, User } from '@supabase/supabase-js';

export const signUpWithOtp = async (email: string, phone: string, name: string): Promise<{ data: { user: User | null }, error: AuthError | null }> => {
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        phone: phone,
        options: {
            shouldCreateUser: true,
            data: {
                display_name: name,
                phone_number: phone,
            }
        }
    });
    return { data, error };
};

export const insertUser = async (id: string, name: string, phone_number: string) => {
    const { data, error } = await supabase
        .from("users")
        .insert([
            {
                id: id,
                name: name,
                phone_number: phone_number,
            }
        ]);
    return { data, error }
}

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