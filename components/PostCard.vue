<script setup lang="ts">
  const props = defineProps({
    post: Object,
  });
  const emit = defineEmits(["deleted", "deleted"]);

  const client = useSupabaseClient();

  const isModalOpen = ref(false);
  const success = ref(false);
  const image = ref(null);
  const images = ref(null);

  onMounted(async () => {
    const { data: imageData, error: postImageFetchError } = await client
      .from("post_images")
      .select("url")
      .eq("post_id", props.post?.id);

    image.value = imageData[0].url;
    images.value = imageData;
    for (const imageUrl of images.value) {
      console.log(imageUrl.url);
    }
  });

  const deletePost = async () => {
    isModalOpen.value = true;
    const { error: postDeleteError } = await client
      .from("posts")
      .delete()
      .eq("id", props.post?.id);

    for (const imageUrl of images.value) {
      const { data: postImageDeleteData, error: postImageDeleteError } =
        await client.storage
          .from("post-images")
          .remove([imageUrl.url.split("/").pop()]);

      if (!postDeleteError || !postImageDeleteError) {
        success.value = true;
      }
    }
    emit("deleted");
  };
</script>

<template>
  <UModal v-model="isModalOpen">
    <div class="p-4 space-y-4">
      <UProgress v-if="!success" animation="carousel" />
      <UProgress v-else :value="100" />
      <UButton
        v-if="success === false"
        label="Ilaniniz siliniyor..."
        block
        variant="soft"
        color="red"
      />
      <UButton
        v-else-if="success === true"
        to="/posts"
        label="Ilaniniz silinmistir!"
        block
        variant="soft"
      />
    </div>
  </UModal>

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
