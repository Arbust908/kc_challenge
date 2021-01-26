<template>
  <nav :class="inContact ? 'justify-between' : 'justify-center'">
    <button
      class="btn"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
      @click="$emit('deselect')"
    >
      <IconChevron
        v-if="inContact"
        :class="hover ? 'anim-wave' : null"
        class="icon"
      />
      <span>
        Contacts
      </span>
    </button>
    <button v-if="inContact" @click="toggleFav" class="fav">
      <img loading="lazy" :src="isFavoriteSrc" width="18" height="18" />
    </button>
  </nav>
</template>

<script>
import IconChevron from "./IconChevron";
export default {
  props: {
    inContact: {
      type: Boolean,
      default: false,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IconChevron,
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    isFavoriteSrc() {
      const star = this.isFavorite ? "full_favorite" : "empty_favorite";
      return require(`@/assets/img/${star}.png`);
    },
  },
  methods: {
    toggleFav() {
      this.$emit("toggleFav", this.isFavorite);
    },
  },
};
</script>

<style scoped>
nav {
  @apply bg-gray-200 text-lg flex pt-8 px-4 pb-2;
}
.btn {
  @apply font-bold flex items-center outline-none md:text-2xl;
}
.btn > .icon {
  @apply h-4 w-4 pr-1 md:h-6 md:w-6 md:pr-2;
}
.fav {
  @apply w-6 h-6 flex justify-center items-center md:w-8 md:h-8 md:rounded-full transition duration-200 ease-out md:hover:bg-yellow-100;
}
.anim-wave {
  animation: wave 0.6s ease-in-out infinite;
  animation-direction: alternate;
}
@keyframes wave {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-0.5rem);
  }
}
</style>
