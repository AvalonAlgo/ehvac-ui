<script setup lang="ts">
  definePageMeta({
    middleware: ["post-middleware"],
  });

  import Joi from "joi";
  import type { FormSubmitEvent } from "#ui/types";

  const client = useSupabaseClient();
  const user = useSupabaseUser();

  const schema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
  });

  const state = reactive({
    title: undefined,
    location: undefined,
    category: undefined,
    description: undefined,
  });

  const success = ref(false);
  const isModalOpen = ref(false);
  const selectedFiles = ref([]);
  const uploadedImages = ref([]);

  const cities = [
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Amasya",
    "Ankara",
    "Antalya",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkâri",
    "Hatay",
    "Isparta",
    "Mersin",
    "İstanbul",
    "İzmir",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Kahramanmaraş",
    "Mardin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Şanlıurfa",
    "Uşak",
    "Van",
    "Yozgat",
    "Zonguldak",
    "Aksaray",
    "Bayburt",
    "Karaman",
    "Kırıkkale",
    "Batman",
    "Şırnak",
    "Bartın",
    "Ardahan",
    "Iğdır",
    "Yalova",
    "Karabük",
    "Kilis",
    "Osmaniye",
    "Düzce",
  ];

  const categories = [
    "Soğutma",
    "Isıtma",
    "Havalandırma",
    "Elektrik",
    "Mekanik",
    "Otomasyon",
    "Yangın",
    "Yalıtım",
    "Jeneratör",
  ];

  const clickImageInput = () => {
    document.getElementById("multiple_files")?.click();
  };

  const handleFileChange = (event) => {
    // Append new files to the existing list of selected files
    selectedFiles.value.push(...Array.from(event.target.files));
    readAndDisplayFiles();
  };

  const readAndDisplayFiles = () => {
    // Clear the existing image previews
    uploadedImages.value = [];

    // Create a FileReader for each selected file
    selectedFiles.value.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Push each file's data URL into the uploadedImages array
        uploadedImages.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    // Remove the image preview and the corresponding file from the selected files
    uploadedImages.value.splice(index, 1);
    selectedFiles.value.splice(index, 1);
  };

  async function onSubmit(event: FormSubmitEvent<any>) {
    // Do something with event.data
    isModalOpen.value = true;
    success.value = false;

    const { data: postData, error: postError } = await client
      .from("posts")
      .insert({
        user_id: user.value?.id,
        title: state.title,
        location: state.location,
        category: state.category,
        description: state.description,
      })
      .select()
      .single();
    if (postError) {
      success.value = false;
      return;
    }

    const postId = postData.id;

    const uploadPromises = selectedFiles.value.map(async (file) => {
      const name = self.crypto.randomUUID();
      const fileExtension = file.name.split(".").pop();
      const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
      const filePath = `${name}-${fileNameWithoutExtension}.${fileExtension}`; // Prepend the post's ID to the file name

      const { data: imageData, error: imageError } = await client.storage
        .from("post-images")
        .upload(filePath, file, {
          cacheControl: "0", // Optional cache control settings
          upsert: false, // Set to true if you want to overwrite existing files with the same name
        });

      const { data: postImageUrl } = await client.storage
        .from("post-images")
        .getPublicUrl(filePath);

      const { data: postImagesData, error: postImagesError } = await client
        .from("post_images")
        .insert({
          post_id: postData.id,
          url: postImageUrl.publicUrl,
        });
    });

    success.value = true;
  }
</script>

<template>
  <UModal v-model="isModalOpen">
    <div class="p-4 space-y-4">
      <UProgress v-if="!success" animation="carousel" />
      <UProgress v-else :value="100" color="emerald" />
      <UButton
        v-if="success === false"
        label="Kapat"
        block
        variant="soft"
        color="red"
      />
      <UButton
        v-else-if="success === true"
        to="/posts"
        label="Ilanlarima Don"
        block
        variant="soft"
        color="emerald"
      />
    </div>
  </UModal>

  <div class="flex justify-center m-auto h-screen bg-gray-900">
    <UContainer class="mx-auto w-4/5 sm:w-2/3 my-auto">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Title" name="title">
          <UInput v-model="state.title" />
        </UFormGroup>

        <UFormGroup label="Location" name="location">
          <USelect v-model="state.location" :options="cities" />
        </UFormGroup>

        <UFormGroup label="Category" name="category">
          <USelect v-model="state.category" :options="categories" />
        </UFormGroup>

        <UFormGroup label="Description" name="description">
          <UTextarea v-model="state.description" size="xl" autoresize />
        </UFormGroup>

        <UFormGroup label="Images" name="images">
          <UButton
            @click="clickImageInput"
            label="Upload"
            block
            variant="outline"
          />
          <input
            @change="handleFileChange"
            id="multiple_files"
            type="file"
            accept="image/*"
            multiple
            hidden
          />

          <div v-if="uploadedImages.length" class="grid grid-cols-2 gap-2 mt-4">
            <div
              v-for="(image, index) in uploadedImages"
              :key="index"
              class="relative group"
            >
              <img
                class="h-64 w-full object-cover rounded-lg"
                :src="image"
                alt="Uploaded Image"
              />
              <div
                class="absolute top-0 left-0 h-full w-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition rounded-lg flex justify-center items-center"
              >
                <svg
                  class="hidden group-hover:block cursor-pointer"
                  @click="removeImage(index)"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </svg>
              </div>
            </div>
          </div>
        </UFormGroup>

        <UButton type="submit" label="Submit" variant="soft" block />
      </UForm>
    </UContainer>
  </div>
</template>
