import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  const { data, error } = await client
    .from("posts")
    .select("*")
    .eq("user_id", user?.id);

  return data;
});
