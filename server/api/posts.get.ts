import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  if (user?.user_metadata.account_type === "Customer") {
    const { data, error } = await client
      .from("posts")
      .select("*")
      .eq("user_id", user?.id);

    return data;
  } else {
    const { data, error } = await client.from("posts").select("*");

    return data;
  }
});
