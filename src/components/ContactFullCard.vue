<template>
  <div>
    <header>
      <figure>
        <img
          v-if="!hasError"
          @error="hasError = true"
          :alt="`Photo of ${contact.name}`"
          loading="lazy"
          width="150"
          height="150"
          :src="contact.largeImageURL"
        />
        <img
          v-else
          :alt="`Photo of ${contact.name}`"
          width="150"
          height="150"
          src="@/assets/img/user_large.png"
        />
      </figure>
      <h2>{{ contact.name }}</h2>
      <h3>{{ contact.companyName }}</h3>
    </header>
    <section>
      <article
        v-for="(phone, index) in contact.phone"
        :key="phone"
        :class="`${index}-phone`"
      >
        <h3>phone</h3>
        <p class="phone__box">
          <span>{{ phone }}</span>
          <span class="phone__type">{{ index }}</span>
        </p>
      </article>
      <article v-if="contact.address" class="address">
        <h3>address</h3>
        <p>
          {{ contact.address.street }} <br />
          {{ contact.address.city }},
          {{ contact.address.state }}
          {{ contact.address.zipCode }},
          {{ contact.address.country }}
        </p>
      </article>
      <article v-if="contact.birthdate" class="birthdate">
        <h3>birthdate</h3>
        <p>{{ contact.birthdate }}</p>
      </article>
      <article v-if="contact.emailAddress" class="email">
        <h3>email</h3>
        <p>{{ contact.emailAddress }}</p>
      </article>
    </section>
  </div>
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
div {
  @apply p-5 md:p-8;
}
header {
  @apply text-center;
}
figure {
  @apply mb-6 flex justify-center;
}
header > h2 {
  @apply text-2xl md:text-3xl;
}
header > h3 {
  @apply text-xs text-gray-500 md:text-lg;
}
section {
  @apply divide-y md:divide-y-0;
}
section article {
  @apply py-6;
}
article h3 {
  @apply uppercase text-gray-500 mb-4 text-sm;
}
article p {
  @apply font-bold;
}
.phone__box {
  @apply flex justify-between;
}
.phone__type {
  @apply font-normal text-gray-500 capitalize;
}
@media screen and (min-width: 768px) {
  div,
  section {
    @apply grid;
  }
  div {
    grid-template-columns: 300px 1fr;
  }
  section {
    padding-right: 2rem;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-areas:
      "address home"
      "birthdate work"
      "email mobile";
  }
  .home-phone {
    grid-area: home;
  }
  .work-phone {
    grid-area: work;
  }
  .mobile-phone {
    grid-area: mobile;
  }
  .address {
    grid-area: address;
  }
  .birthdate {
    grid-area: birthdate;
  }
  .email {
    grid-area: email;
  }
}
</style>
