<script setup lang="ts"></script>

<template>
  <div>
    <footer class="rounded-lg shadow bg-gray-900">
      <div
        class="w-full mx-auto p-4 md:flex md:items-center md:justify-between"
      >
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2024 E-HVAC
        </span>
        <ul
          class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
        >
          <li>
            <NuxtLink to="" class="hover:underline me-4 md:me-6"
              >About</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              external
              to="/GİZLİLİK-POLİTİKASI.pdf"
              target="_blank"
              class="hover:underline me-4 md:me-6"
              >Gizlilik Politikasi</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              external
              to="/KULLANICI-SÖZLEŞMESİ-(Üyelik Sözleşmesi).pdf"
              target="_blank"
              class="hover:underline me-4 md:me-6"
              >Kullanici Sozlesmesi</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              external
              to="/KVKK-AYDINLATMA METNİ.pdf"
              target="_blank"
              class="hover:underline me-4 md:me-6"
              >KVKK Aydinlatma Metni</NuxtLink
            >
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
