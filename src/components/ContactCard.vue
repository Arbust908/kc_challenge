<template>
  <article>
    <figure>
      <img
        v-if="!hasError"
        @error="hasError = true"
        :alt="`Photo of ${contact.name}`"
        loading="lazy"
        width="60"
        height="60"
        :src="contact.smallImageURL"
      />
      <img
        v-else
        :alt="`Photo of ${contact.name}`"
        width="60"
        height="60"
        src="@/assets/img/user_small.png"
      />
    </figure>
    <div>
      <img loading="lazy" :src="isFavoriteSrc" width="18" height="18" alt="" />
    </div>
    <header>
      <h2>{{ contact.name }}</h2>
      <h3>{{ contact.companyName }}</h3>
    </header>
  </article>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hasError: false,
    };
  },
  computed: {
    isFavoriteSrc() {
      const star = this.contact.isFavorite ? "full_favorite" : "empty_favorite";
      return require(`@/assets/img/${star}.png`);
    },
  },
  methods: {
    thing() {
      console.log("Error");
    },
  },
};
</script>

<style scoped>
article {
  @apply flex py-5 transform transition duration-200 ease-out hover:shadow-lg hover:bg-gray-100 hover:-translate-y-1 cursor-pointer;
}
figure {
  @apply mr-5;
}
div {
  @apply w-4 h-4 pt-1;
}
header {
  @apply ml-1;
}
header h2 {
  @apply text-lg;
}
header h3 {
  @apply text-xs text-gray-500;
}
</style>
