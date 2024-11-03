import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAdminOrderList = ({
    archived = false
}) => {
    const statuses = archived ? ["DELIVERED"] : ["NEW", "COOKING", "DELIVERING"]
    return useQuery({
        queryKey: ["orders", { archived }],
        queryFn: async () => {
            const { data, error } = await supabase.from("orders").select("*").in("status", statuses).order("created_at", { ascending: false });
            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
}

export const useMyOrderList = () => {
    const { session } = useAuth();
    const user_id = session?.user.id;

    return useQuery({
        queryKey: ["orders", { userId: user_id }],
        queryFn: async () => {
            if (!user_id) {
                return null;
            }
            const { data, error } = await supabase.from("orders").select("*").eq("user_id", user_id).order("created_at", { ascending: false });
            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
}


export const useOrderDetails = (id: number) => {
    return useQuery({
        queryKey: ["orders", id],
        queryFn: async () => {
            const { data, error } = await supabase.from("orders").select("*, order_items(*, products(*))").eq("id", id).single();
            if (error) {
                throw new Error(error.message);
            }

            return data;
        },
    });
}


export const useInsertOrder = () => {
    const queryClient = useQueryClient();
    const { session } = useAuth();
    const user_id = session?.user.id;
    return useMutation({
        async mutationFn(data: InsertTables<"orders">) {
            const { error, data: newOrder } = await supabase.from("orders").insert({ ...data, user_id: user_id }).select().single();

            if (error) {
                throw new Error(error.message);
            }

            return newOrder;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["orders"]
            });
        }
    })
}