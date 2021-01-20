<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    {{ info }}
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      info: "Pancho",
    };
  },
  mounted() {
    this.$axios
      // .get("https://jsonplaceholder.typicode.com/users")
      .get("https://s3.amazonaws.com/technical-challenge/v3/contacts.json")
      .then((response) => (this.info = response));
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
