<template>
  <div class="flex flex-col m-auto bg-gray-900">
    <UContainer class="w-full my-12">
      <section class="bg-white dark:bg-gray-900">
        <div class="mx-auto max-w-screen-xl">
          <div
            class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8"
          >
            <h1
              class="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold"
            >
              Türkiye'nin İklimlendirme Servis Platformu
            </h1>
            <p
              class="text-lg font-normal text-gray-500 dark:text-gray-400 mt-6"
            >
              Teklif Al, Karşılaştır
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div
              class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12"
            >
              <h2
                class="text-gray-900 dark:text-white text-3xl font-extrabold mb-2"
              >
                Nasıl kullanılır?
              </h2>
              <ol
                class="text-lg mt-10 text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400"
              >
                <li class="mb-10 flex items-center -mx-4">
                  <span
                    class="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700 mr-4"
                  >
                    <svg
                      class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </span>
                  <h3 class="font-medium leading-tight">İlanı yükle</h3>
                </li>
                <li class="mb-10 flex items-center -mx-4">
                  <span
                    class="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700 mr-4"
                  >
                    <svg
                      class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path
                        d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"
                      />
                    </svg>
                  </span>
                  <h3 class="font-medium leading-tight">Teklif al</h3>
                </li>
                <li class="mb-10 flex items-center -mx-4">
                  <span
                    class="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700 mr-4"
                  >
                    <svg
                      class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path
                        d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"
                      />
                    </svg>
                  </span>
                  <h3 class="font-medium leading-tight">En iyi teklifi bul</h3>
                </li>
                <li class="flex items-center -mx-4">
                  <span
                    class="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700 mr-4"
                  >
                    <svg
                      class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path
                        d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"
                      />
                    </svg>
                  </span>
                  <h3 class="font-medium leading-tight">Hizmet al</h3>
                </li>
              </ol>
            </div>

            <div
              class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12"
            >
              <h2
                class="text-gray-900 dark:text-white text-3xl font-extrabold mb-2"
              >
                Best react libraries around the web
              </h2>
              <p
                class="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4"
              >
                Static websites are now used to bootstrap lots of websites and
                are becoming the basis for a variety of tools that even
                influence both web designers and developers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </UContainer>

    <UContainer class="w-full my-12">
      <h2
        class="text-gray-900 dark:text-white text-2xl md:text-4xl font-extrabold mb-4 text-center"
      >
        Vitrin
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            class="h-auto max-w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
            alt=""
          />
        </div>
      </div>
    </UContainer>

    <UContainer class="w-full my-12">
      <h2
        class="text-gray-900 dark:text-white text-2xl md:text-4xl font-extrabold mb-4 text-center"
      >
        Sıkça Sorulan Sorular
      </h2>
      <UAccordion
        size="lg"
        multiple
        :items="[
          {
            label: 'Tamirci (Hizmet veren) nedir?',
            content:
              'Site içerisinde hizmet almak isteyen kullanıcıların paylaştığı ilanları görüntüleyip, ilanlar arasından kendisine uygun olanlara hizmet vermek (tamir etmek) isteyen kullanıcı tipi.',
          },
          {
            label: 'Cihaz sahibi (Hizmet alan) nedir?',
            content:
              'İhtiyac duyduğu hizmeti `İlan Ekle` kısmından ekleyerek, gelen teklifler arasından seçen kullanıcı tipi.',
          },
          {
            label: 'Ücretli üyelik nedir?',
            content:
              'Üye olma işleminde hizmet veren ve tedarikçi olarak seçim yapan kullanıcılar, verilen ilanları görüntüleyebilmek için ücret öderler.',
          },
          {
            label: 'Ücreti kimler öder?',
            content:
              'Üyelik teklifinde hizmet veren ve tedarikçi olanlar ücret öder.',
          },
          {
            label: 'Kaç çeşit üyelik vardır?',
            content: 'Bir (1) adet üyelik seçeneği vardır.',
          },

          {
            label: 'Belirtilen üyeliğin içeriği nedir?',
            content:
              'Belirtilen kullanıcılar, 6 ay boyunca site içerisinde sınırsız ilan görüntüleyip, mesaj gönderebilirler.',
          },

          {
            label: 'Tedarikçi nedir?',
            content:
              'e-hvac.net sitesi içerisinde yedek parça, cihaz ya da gerekli aletlerin satışını yapan üyelik tipi.',
          },

          {
            label: 'Tedarikçi olmak ücretli mi?',
            content:
              'Site içerisinde satış yapan ve hizmet veren kısımlar ücretlidir.',
          },

          {
            label:
              'Hizmet veren olarak birden fazla ilana mesaj gönderebilir miyim?',
            content: 'Evet, gönderebilirsiniz.',
          },

          {
            label: 'Hizmet alan olarak diğer ilanları görüntüleyebilir miyim?',
            content:
              'Hayır, üyelik tipi hizmet veren ve tedarikçi olanlar görüntüleyebilir.',
          },

          {
            label: 'Hizmet alan olarak ilan verme limitim var mi?',
            content: 'Hayır, sınırsız sayıda ilan verme hakkınız var.',
          },
        ]"
      />
    </UContainer>
  </div>
</template>
