<template>
    <div class="productcategory">
        <Header :title="categoryname" />
        <ProductHolder/>
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue'
  import ProductHolder from '@/components/ProductHolder.vue'
  import {mapActions} from 'vuex';
  
  export default {
    name: 'ProductCategory',
    components: {
      Header,
      ProductHolder
    },
  
    data(){
      return {
        categoryname: '',
        catID: null,
      }
    },
  
    methods:  {
      ...mapActions([
        'fetchIdsByCategory'
      ])
    },
  
    watch: {
      $route(){
        this.catID = this.$route.params.id;
        this.categoryname = this.$route.params.name;
        this.fetchIdsByCategory(this.catID);
      }
    },
  
    mounted(){
      this.catID = this.$route.params.id;
      this.categoryname = this.$route.params.name;
      this.fetchIdsByCategory(this.catID);
    }
  }
  
  </script>
  