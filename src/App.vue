<template>
  <div id="app">
    <ContactNav
      :inContact="selected_contact !== null"
      :isFavorite="selected_contact ? selected_contact.isFavorite : false"
      @toggleFav="toggleFavorite"
      @deselect="selected_contact = null"
    />
    <transition
      enter-class="translate-x-full"
      enter-active-class="transform transition duration-200 delay-200 ease-out"
      enter-to-class="translate-x-0"
      leave-class="translate-x-0"
      leave-active-class="transform transition duration-200 ease-out"
      leave-to-class="-translate-x-full"
    >
      <section v-if="selected_contact === null">
        <ContactDivider title="favorite contacts" />
        <section class="contactBox">
          <ContactCard
            v-for="contact in favorites"
            :key="contact.id"
            :contact="contact"
            @click.native="toggleSelect(contact)"
          />
        </section>
        <!-- {{ favorites }} -->
        <ContactDivider title="other contacts" />
        <section class="contactBox">
          <ContactCard
            v-for="contact in others"
            :key="contact.id"
            :contact="contact"
            @click.native="toggleSelect(contact)"
          />
        </section>
      </section>
      <article v-else>
        <ContactFullCard :contact="selected_contact" />
      </article>
    </transition>
  </div>
</template>

<script>
import ContactCard from "./components/ContactCard.vue";
import ContactDivider from "./components/ContactDivider.vue";
import ContactFullCard from "./components/ContactFullCard.vue";
import ContactNav from "./components/ContactNav.vue";

export default {
  name: "App",
  components: {
    ContactDivider,
    ContactNav,
    ContactCard,
    ContactFullCard,
  },
  data() {
    return {
      contacts: [],
      loading: true,
      selected_contact: null,
    };
  },
  computed: {
    hasContacts() {
      return this.contacts && this.contacts.length > 0;
    },
    favorites() {
      return this.hasContacts
        ? this.contacts
            .filter((contact) => {
              return contact.isFavorite;
            })
            .sort(this.compare)
        : [];
    },
    others() {
      return this.hasContacts
        ? this.contacts
            .filter((contact) => {
              return !contact.isFavorite;
            })
            .sort(this.compare)
        : [];
    },
  },
  mounted() {
    fetch("https://s3.amazonaws.com/technical-challenge/v3/contacts.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta");
        console.log(data);
        this.contacts = data;
      })
      .catch((err) => {
        console.log("Error");
        console.log(err.response);
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    toggleSelect(contact) {
      this.selected_contact =
        this.selected_contact === null ||
        this.selected_contact.id !== contact.id
          ? contact
          : null;
    },
    toggleFavorite(value) {
      this.selected_contact.isFavorite = !value;
      this.contacts = this.contacts.map((contact) => {
        if (contact.id === this.selected_contact.id) {
          contact.isFavorite = !value;
        }
        return contact;
      });
    },
    compare(contact1, contact2) {
      if (contact1.name < contact2.name) {
        return -1;
      }
      if (contact1.name > contact2.name) {
        return 1;
      }
      return 0;
    },
  },
};
</script>
<style scoped>
.contactBox {
  @apply divide-y mx-5;
}
@media screen and (min-width: 768px) {
  .contactBox {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    @apply divide-y-0;
  }
}
</style>
