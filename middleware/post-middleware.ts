export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();

  if (user?.value?.user_metadata.account_type !== "Customer") {
    return navigateTo("/posts");
  }
});
