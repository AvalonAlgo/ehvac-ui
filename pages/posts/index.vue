<script setup lang="ts">
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
    <UContainer class="sm:grid sm:grid-cols-3 gap-4">
      <PostCard
        v-if="posts && posts.length !== 0"
        @deleted="getData"
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </UContainer>
    <UContainer v-if="posts && posts.length === 0">
      Ilaniniz yoktur
    </UContainer>
  </div>
</template>
