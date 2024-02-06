<script setup lang="ts">
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

  async function onSubmit(event: FormSubmitEvent<any>) {
    // Do something with event.data
    if (state.password !== state.confirm_password) {
      console.log("error");
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

        <UFormGroup label="Sirket Adi" name="company_name">
          <UInput v-model="state.company_name" />
        </UFormGroup>

        <UFormGroup label="Hesap Turu" name="account_type">
          <USelect
            v-model="state.account_type"
            :options="['Hizmet Alan', 'Hizmet Veren', 'Tedarikci']"
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

        <UButton type="submit" block variant="soft" color="cyan">
          Hesap ac
        </UButton>
      </UForm>
    </UContainer>
  </div>
</template>
