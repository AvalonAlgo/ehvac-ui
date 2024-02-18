<script setup lang="ts">
  definePageMeta({
    middleware: ["loginregister-middleware"],
  });

  import Joi from "joi";
  import type { FormSubmitEvent } from "#ui/types";

  const supabase = useSupabaseClient();

  const schema = Joi.object({
    email: Joi.string().required(),
    company_name: Joi.string().required(),
    account_type: Joi.string().required(),
    password: Joi.string().min(8).required(),
    confirm_password: Joi.string().min(8).required(),
    confirm: Joi.allow(),
  });

  const state = reactive({
    email: undefined,
    company_name: undefined,
    account_type: undefined,
    password: undefined,
    confirm_password: undefined,
    confirm: undefined,
  });

  const isModalOpen = ref(false);
  const registerSuccess = ref(false);
  const passwordError = ref(false);

  async function onSubmit(event: FormSubmitEvent<any>) {
    registerSuccess.value = false;
    passwordError.value = false;
    isModalOpen.value = true;

    if (state.password !== state.confirm_password) {
      passwordError.value = true;
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: state.email,
      password: state.password,
      options: {
        data: {
          company_name: state.company_name,
          account_type: state.account_type,
          avatar_url: null,
        },
        emailRedirectTo: "http://localhost:3000/login",
      },
    });

    if (!error) {
      registerSuccess.value = true;
      setTimeout(() => {
        navigateTo("/confirm");
      }, 5000);
    }
  }
</script>

<template>
  <UModal v-model="isModalOpen">
    <div class="p-4 space-y-4">
      <UProgress v-if="!registerSuccess && !passwordError" animation="swing" />
      <UProgress
        v-if="!registerSuccess && passwordError"
        :value="100"
        color="red"
      />
      <UProgress v-if="registerSuccess" :value="100" color="emerald" />
      <UButton
        v-if="!registerSuccess && passwordError"
        label="Passwords do not match!"
        color="red"
        variant="soft"
        block
        @click="isModalOpen = false"
      />
      <UButton
        v-if="registerSuccess"
        label="Success! Do not close the browser..."
        color="emerald"
        variant="soft"
        block
      />
    </div>
  </UModal>

  <div class="flex justify-center m-auto h-screen bg-gray-900">
    <UContainer class="mx-auto w-4/5 sm:w-2/3 mt-20">
      <h2 class="text-center mb-4 text-3xl sm:text-4xl font-bold">Hesap Ac</h2>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Sirket Adi" name="company_name">
          <UInput v-model="state.company_name" />
        </UFormGroup>

        <UFormGroup label="Hesap Turu" name="account_type">
          <USelect
            v-model="state.account_type"
            :options="['Customer', 'Service', 'Supplier']"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
        <UFormGroup label="Confirm Password" name="confirm_password">
          <UInput v-model="state.confirm_password" type="password" />
        </UFormGroup>

        <UFormGroup name="confirm">
          <UCheckbox
            v-model="state.confirm"
            label="I have read the terms and conditions, and accept them"
            required
          />
        </UFormGroup>

        <UButton
          v-if="!state.confirm"
          type="submit"
          block
          variant="soft"
          color="cyan"
          disabled
        >
          Hesap ac
        </UButton>
        <UButton
          v-else-if="state.confirm"
          type="submit"
          block
          variant="soft"
          color="cyan"
        >
          Hesap ac
        </UButton>
      </UForm>
    </UContainer>
  </div>
</template>
