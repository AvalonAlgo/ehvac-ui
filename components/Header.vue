<script setup lang="ts">
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();

  const isOpen = ref(false);
  const route = useRoute();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigateTo("/");
    }
  };
</script>

<template>
  <div>
    <header class="bg-gray-900">
      <div class="container mx-auto flex justify-between p-5 items-center">
        <NuxtLink
          to="/"
          class="flex title-font font-medium items-center text-white text-2xl"
        >
          E-HVAC
        </NuxtLink>
        <UButton @click="isOpen = true" label="Navigasyon" variant="outline" />
      </div>
    </header>

    <UModal v-model="isOpen">
      <div class="p-4 flex flex-col space-y-2">
        <UButton
          v-if="route.name === 'index'"
          label="Ana sayfa"
          to="/"
          variant="soft"
          color="emerald"
          block
        />
        <UButton v-else label="Ana sayfa" to="/" variant="soft" block />

        <UButton
          v-if="route.name === 'login' && !user"
          label="Giris yap"
          to="/login"
          variant="soft"
          color="emerald"
          block
        />
        <UButton
          v-else-if="!user"
          label="Giris yap"
          to="/login"
          variant="soft"
          block
        />

        <UButton
          v-if="route.name === 'register' && !user"
          label="Hesap ac"
          to="/register"
          variant="soft"
          color="emerald"
          block
        />
        <UButton
          v-else-if="!user"
          label="Hesap ac"
          to="/register"
          variant="soft"
          block
        />

        <UButton
          v-if="
            route.name === 'posts' &&
            user &&
            user.user_metadata.account_type === 'Customer'
          "
          label="My Posts"
          to="/posts"
          block
          variant="soft"
          color="emerald"
        />
        <UButton
          v-else-if="user && user.user_metadata.account_type === 'Customer'"
          label="My Posts"
          to="/posts"
          block
          variant="soft"
        />

        <UButton
          v-if="
            route.name === 'posts-create' &&
            user &&
            user.user_metadata.account_type === 'Customer'
          "
          label="New Post"
          to="/posts/create"
          block
          variant="soft"
          color="emerald"
        />
        <UButton
          v-else-if="user && user.user_metadata.account_type === 'Customer'"
          label="New Post"
          to="/posts/create"
          block
          variant="soft"
        />

        <UButton
          v-if="user && route.name === 'profile'"
          label="Profile"
          to="/profile"
          block
          variant="soft"
          color="emerald"
        />
        <UButton
          v-else-if="user"
          label="Profile"
          to="/profile"
          block
          variant="soft"
        />

        <UButton
          v-if="user"
          @click="signOut"
          label="Oturumdan cik"
          variant="soft"
          block
          color="red"
        />
      </div>
    </UModal>
  </div>
</template>
