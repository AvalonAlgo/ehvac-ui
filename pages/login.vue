<script setup lang="ts">
  import Joi from "joi";
  import type { FormSubmitEvent } from "#ui/types";

  const supabase = useSupabaseClient();

  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  const state = reactive({
    email: undefined,
    password: undefined,
  });

  async function onSubmit(event: FormSubmitEvent<any>) {
    // Do something with event.data
    const { data, error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });
    if (!error) {
      navigateTo("/posts");
    }
  }
</script>

<template>
  <div class="flex justify-center m-auto h-screen bg-gray-900">
    <UContainer class="mx-auto w-4/5 sm:w-2/3 my-auto">
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit" block variant="soft" color="green">
          Oturum ac
        </UButton>
      </UForm>
    </UContainer>
  </div>
</template>
