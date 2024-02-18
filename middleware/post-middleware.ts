export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const client = useSupabaseClient();

  if (!user?.value) {
    return navigateTo("/");
  }

  if (
    to.name === "posts-create" &&
    user.value.user_metadata.account_type !== "Customer"
  ) {
    return navigateTo("/posts");
  }

  if (
    to.name === "posts-id" &&
    user.value.user_metadata.account_type === "Customer"
  ) {
    const { data, error } = await client
      .from("posts")
      .select("user_id")
      .eq("id", to.params.id)
      .single();

    if (data?.user_id !== user.value.id) {
      return navigateTo("/posts");
    }
  }
});
