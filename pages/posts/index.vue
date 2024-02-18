<script setup lang="ts">
  definePageMeta({
    middleware: ["post-middleware"],
  });

  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const {
    pending,
    data: posts,
    refresh: getData,
  } = await useLazyAsyncData("posts", () => $fetch(`/api/posts`));

  onMounted(async () => {
    getData();
  });
</script>

<template>
  <div class="h-screen bg-gray-900">
    <UContainer
      class="sm:grid sm:grid-cols-3 sm:gap-4 sm:flex-none sm:space-y-0 flex flex-col space-y-4"
    >
      <PostCard
        v-if="posts && posts.length !== 0"
        @deleted="getData"
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </UContainer>
    <UContainer
      v-if="
        user?.user_metadata.account_type === 'Customer' &&
        posts &&
        posts.length === 0
      "
    >
      Ilaniniz yoktur
    </UContainer>
    <UContainer
      v-else-if="
        user?.user_metadata.account_type !== 'Customer' &&
        posts &&
        posts.length === 0
      "
    >
      Henuz ilan yoktur
    </UContainer>
  </div>
</template>
