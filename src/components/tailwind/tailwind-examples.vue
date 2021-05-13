<template>
  <div>
    <div class="grid grid-cols-1 gap-6 m-3 md:grid-cols-3">
      <section class="flex">
        <div
          class="relative flex w-full overflow-hidden text-white shadow-lg rounded-3xl"
        >
          <div
            class="flex w-full bg-gradient-to-br from-purple-500 md:flex-col to-indigo-500"
          >
            <div
              class="relative z-10 flex flex-col items-start p-6 sm:max-w-sm sm:flex-none md:w-auto md:flex-auto xl:p-8"
            >
              <div class="justify-center">
                <img
                  alt="Profile Pic"
                  src="../../assets/download.png"
                  class="flex justify-end ml-32 card-profile-pic"
                >
                <h1 class="relative">
                  Profile A
                </h1>
              </div>
              <p class="text-left">
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs. The passage is
                attributed to an unknown typesetter in the 15th century who is
                thought to have scrambled parts of Cicero's De Finibus Bonorum
                et Malorum for use in a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="flex">
        <div
          class="relative flex w-full overflow-hidden text-white shadow-lg rounded-3xl"
        >
          <div
            class="flex w-full bg-gradient-to-br from-pink-500 to-rose-500 md:flex-col"
          >
            <div
              class="relative z-10 flex flex-col items-start p-6 sm:max-w-sm sm:flex-none md:w-auto md:flex-auto xl:p-8"
            >
              <div class="justify-center">
                <img
                  alt="Profile Pic"
                  src="../../assets/download.png"
                  class="flex justify-end ml-32 card-profile-pic"
                >
                <h1 class="relative">
                  Profile B
                </h1>
              </div>
              <p class="text-left">
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs. The passage is
                attributed to an unknown typesetter in the 15th century who is
                thought to have scrambled parts of Cicero's De Finibus Bonorum
                et Malorum for use in a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="flex">
        <div
          class="relative flex w-full overflow-hidden text-white shadow-lg rounded-3xl"
        >
          <div
            class="flex w-full bg-gradient-to-br from-yellow-400 to-orange-500 md:flex-col"
          >
            <div
              class="relative z-10 flex flex-col items-start p-6 sm:max-w-sm sm:flex-none md:w-auto md:flex-auto xl:p-8"
            >
              <div class="justify-center">
                <img
                  alt="Profile Pic"
                  src="../../assets/download.png"
                  class="flex justify-end ml-32 card-profile-pic"
                >
                <h1 class="relative">
                  Profile C
                </h1>
              </div>
              <p class="text-left">
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs. The passage is
                attributed to an unknown typesetter in the 15th century who is
                thought to have scrambled parts of Cicero's De Finibus Bonorum
                et Malorum for use in a type specimen book.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="m-4 overflow-hidden border rounded">
      <div class="flex text-left">
        <div>
          <img
            alt="Profile Pic"
            class="object-cover w-full h-48 md:h-full md:w-48"
            src="../../assets/download.png"
          >
        </div>
        <div class="p-8">
          <div class="text-sm font-semibold text-indigo-500 uppercase">
            CASE STUDY
          </div>
          <a
            class="block mt-1 text-lg font-medium leading-tight text-black hover:underline"
          >Finding customers for your new business</a>
          <p class="mt-2 text-gray-500">
            Getting a new business off the ground is a lot of hard work. Here
            are five ideas you can use to find your first customers.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  mounted() {},
  created() {},
  methods: {},
};
</script>
<style scoped>
.card-profile-pic {
  height: 60px;
  border-radius: 50%;
  width: 20%;
}
</style>
