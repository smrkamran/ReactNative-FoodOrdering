import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const useInsertOrderItems = () => {
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn(items: InsertTables<"order_items">[]) {
            const { error, data: newItems } = await supabase.from("order_items").insert(items).select();

            if (error) {
                throw new Error(error.message);
            }

            return newItems;
        }
    })
}