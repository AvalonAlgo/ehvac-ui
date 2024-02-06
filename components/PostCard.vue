<script setup lang="ts">
  const props = defineProps({
    post: Object,
  });
  const emit = defineEmits(["deleted", "deleted"]);

  const client = useSupabaseClient();

  const image = ref(null);

  onMounted(async () => {
    const { data, error } = await client
      .from("post_images")
      .select("url")
      .eq("post_id", props.post?.id)
      .limit(1)
      .single();

    image.value = data?.url;
  });

  const deletePost = async () => {
    const { error } = await client
      .from("posts")
      .delete()
      .eq("id", props.post?.id);

    emit("deleted");
  };
</script>

<template>
  <div v-if="image && post">
    <div
      class="bg-gray-800 bg-opacity-40 p-6 rounded-lg transform-gpu hover:scale-105 transition"
    >
      <NuxtImg
        class="h-40 rounded w-full object-cover object-center mb-4"
        :src="image"
        alt="content"
      />
      <h3
        class="tracking-widest text-indigo-400 text-xs font-medium title-font"
      >
        {{ post.location }} - {{ post.category }}
      </h3>
      <h2 class="text-lg text-white font-medium title-font mb-2">
        {{ post.title }}
      </h2>
      <div class="space-y-1.5">
        <UButton
          :to="`/posts/` + props.post?.id"
          label="Detaylar"
          block
          variant="soft"
        />
        <UButton
          @click="deletePost"
          label="Sil"
          block
          variant="soft"
          color="red"
        />
      </div>
    </div>
  </div>
</template>
