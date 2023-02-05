<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">OtterShop</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>

        <b-nav-item-dropdown text="Product Categories" right>
          <b-dropdown-item v-for="cat in categories" :key="cat.id" :to="`/productCategory/${cat.id}/${cat.cat_name}`">{{cat.cat_name}}</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!token" to="/register">Register</b-nav-item>
        <b-nav-item v-if="!token" to="/login">Log In</b-nav-item>
        <b-nav-item v-else @click="logout()">Log Out</b-nav-item>

        <b-nav-form>
          <b-nav-item v-if="token" to="/cart">Cart</b-nav-item>
          <b-form-input v-model="searchQuery" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button @click="search" size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import {mapActions, mapState, mapMutations} from 'vuex';

  export default {
    name: 'App',

    data() {
      return {
        // categories: null,
        searchQuery: ''
      }
    },

    computed: {
      ...mapState([
        'categories',
        'token'
      ])
    },

    mounted() {
      if(localStorage.token){
        this.setToken(localStorage.token);
      }

      this.fetchCategories();
      // fetch("http://localhost:1337/admin/productCategory")
      // .then(obj => obj.json())
      // .then(res => {
      //   let tempNiz = [];
      //   for(let i=0;i<res.length;i++){
      //    console.log("Debug fetch productcat ids: " + res[i].id);
      //     tempNiz.push(res[i]);
      //   }
      //   this.categories = tempNiz;
      //   console.log("Ispis niza " + this.categories);
      // });
    },

    methods: {
      ...mapActions([
        'fetchCategories',
      ]),

      ...mapMutations([
        'removeToken',
        'setToken'
      ]),

      search(e){
        e.preventDefault();

        const sq = this.searchQuery;
        this.searchQuery = '';

        this.$router.push({name: 'Search', query: {q: sq}});
      },

      logout(){
        this.removeToken();
      }
    }
  }
</script>

<style>
  .navbar.navbar-dark.bg-dark {
    background-color: #61321a!important;
  }
</style>
