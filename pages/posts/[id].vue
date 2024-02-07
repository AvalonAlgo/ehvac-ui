<script setup lang="ts">
  const client = useSupabaseClient();
  const currentPost = useRoute().params.id;

  const isOpen = ref(false);
  const currentImage = ref(null);
  const post = ref(null);
  const post_images = ref(null);
  const poster = ref(null);

  let items = [];

  const openImage = (item) => {
    isOpen.value = true;
    currentImage.value = item;
  };

  onMounted(async () => {
    const { data: postData, error: postError } = await client
      .from("posts")
      .select("*")
      .eq("id", currentPost)
      .single();

    const { data: postImagesData, error: postImagesError } = await client
      .from("post_images")
      .select("url")
      .eq("post_id", currentPost);

    const { data: posterData, error: posterError } = await client
      .from("profiles")
      .select("company_name, avatar_url")
      .eq("id", postData?.user_id)
      .single();

    if (postError || postImagesError || posterError) {
      return;
    }

    post.value = postData;
    post_images.value = postImagesData;
    poster.value = posterData;

    post_images.value.forEach((item) => {
      items.push(item.url);
    });
  });
</script>

<template>
  <UModal v-model="isOpen" :ui="{ container: 'items-center' }">
    <div class="p-4">
      <img v-if="currentImage" :src="currentImage" class="w-full" />
    </div>
  </UModal>

  <div class="flex justify-center m-auto h-screen bg-gray-900">
    <UContainer class="mx-auto w-4/5 sm:w-2/3 my-auto">
      <div v-if="post" class="lg:w-4/6 mx-auto">
        <div class="rounded-lg overflow-hidden">
          <UCarousel
            v-slot="{ item }"
            :items="items"
            :ui="{ item: 'basis-full' }"
            class="rounded-lg overflow-hidden"
            arrows
          >
            <img
              :src="item"
              class="h-96 object-cover w-full"
              draggable="false"
              @click="openImage(item)"
            />
          </UCarousel>
        </div>

        <div class="flex flex-col sm:flex-row mt-10">
          <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8 my-auto">
            <img
              class="rounded-full w-36 h-36 object-cover items-center justify-center mx-auto"
              :src="poster?.avatar_url"
              alt="Extra large avatar"
            />

            <div class="flex flex-col items-center text-center justify-center">
              <h2 class="font-medium title-font mt-4 text-white text-lg">
                {{ poster?.company_name }}
              </h2>
              <div class="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
            </div>
          </div>

          <div
            class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left flex flex-col justify-between"
          >
            <p class="leading-relaxed text-lg mb-4">
              {{ post?.description }}
            </p>
            <UButton
              label="Back"
              to="/posts"
              block
              variant="outline"
              class="w-2/3 self-center sm:self-start"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
