<template>
  <h2>
    {{ title }}
  </h2>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "contacts",
    },
  },
};
</script>

<style scoped>
h2 {
  @apply uppercase text-sm font-bold text-left bg-gray-300 py-1 px-4;
}
@media screen and (min-width: 768px) {
  h2 {
    @apply text-base;
  }
}
@media screen and (min-width: 1024px) {
  h2 {
    @apply text-lg;
  }
}
</style>
