<script setup lang="ts">
  definePageMeta({
    middleware: ["profile-middleware"],
  });

  const user = useSupabaseUser();
  const client = useSupabaseClient();

  const success = ref(false);
  const isModalOpen = ref(false);
  const avatarFile = ref(null);
  const avatarUrlRef = ref(null);
  const previewAvatarUrl = ref(null); // Holds the preview URL for the new avatar

  const handleFileChange = (event: any) => {
    avatarFile.value = event.target.files[0];

    // Create a URL for the preview of the selected file
    previewAvatarUrl.value = URL.createObjectURL(avatarFile.value);
  };

  const initiateAvatarUpload = () => {
    document.getElementById("user_avatar")?.click();
  };

  const uploadImage = async () => {
    if (!avatarFile.value) return;
    isModalOpen.value = true;

    const { error } = await client.storage
      .from("avatars")
      .upload(`${user?.value.id}-avatar.jpg`, avatarFile.value, {
        cacheControl: "0",
        upsert: true,
      });

    if (error) {
      console.error("Error uploading file:", error);
      return;
    }

    const { data: publicUrlData } = client.storage
      .from("avatars")
      .getPublicUrl(`${user?.value.id}-avatar.jpg`);

    const { data: updateProfileData, error: updateProfileError } = await client
      .from("profiles")
      .update({ avatar_url: publicUrlData.publicUrl })
      .eq("id", user.value?.id)
      .select();

    if (!updateProfileError) {
      success.value = true;
    }
  };

  const closeModal = async () => {
    isModalOpen.value = false;
    const { data: avatarUrl, error } = await client
      .from("profiles")
      .select("avatar_url")
      .eq("id", user.value?.id)
      .single();
    avatarUrlRef.value = avatarUrl?.avatar_url;
  };

  onMounted(async () => {
    const { data: avatarUrl, error } = await client
      .from("profiles")
      .select("avatar_url")
      .eq("id", user.value?.id)
      .single();
    avatarUrlRef.value = avatarUrl?.avatar_url;
  });
</script>

<template>
  <UModal v-model="isModalOpen">
    <div class="p-4 space-y-4">
      <UProgress v-if="!success" animation="carousel" />
      <UProgress v-else :value="100" color="emerald" />
      <UButton
        v-if="success === true"
        @click="closeModal"
        label="Kapat"
        block
        variant="soft"
        color="emerald"
      />
    </div>
  </UModal>

  <div class="flex justify-center m-auto h-screen bg-gray-900">
    <UContainer class="mx-auto w-4/5 sm:w-2/3 my-auto">
      <section class="text-gray-400 bg-gray-900 body-font">
        <div
          class="container mx-auto flex flex-col px-5 py-24 justify-center items-center"
        >
          <NuxtImg
            v-if="previewAvatarUrl || avatarUrlRef"
            class="rounded-lg w-72 h-72 object-cover mb-4"
            :src="previewAvatarUrl || avatarUrlRef"
            alt="Avatar preview"
          />
          <NuxtImg
            v-else
            class="rounded-lg w-72 h-72 object-cover mb-4"
            src="https://placehold.co/600x400"
            alt="Empty avatar"
          />
          <div
            class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center"
          >
            <form class="max-w-lg mx-auto" @submit.prevent="uploadImage">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="user_avatar"
                >Upload file</label
              >
              <UButton
                @click="initiateAvatarUpload"
                label="Choose an image"
                block
                variant="outline"
              />
              <input
                class="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="user_avatar"
                type="file"
                accept="image/*"
                @change="handleFileChange"
              />
              <div
                class="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="user_avatar_help"
              >
                A profile picture is useful to confirm your are logged into your
                account
              </div>
              <UButton
                v-if="previewAvatarUrl"
                type="submit"
                block
                class="mt-4"
                variant="soft"
              >
                Submit
              </UButton>
            </form>
          </div>
        </div>
      </section>
    </UContainer>
  </div>
</template>
