import { LocationDB } from "@/hooks/useCurrentLocation";
import { supabase } from "@/lib/supabase";

export const insertCall = async (id: string, caller_id: string, location: LocationDB) => {
    const { data, error } = await supabase
        .from("calls")
        .insert([
            {
                id: id,
                caller_id: caller_id,
                location: location
            }
        ]);
    return { data, error }
};
