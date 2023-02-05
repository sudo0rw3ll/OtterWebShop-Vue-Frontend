<template>
    <div id="app">
        <ProductHolder v-if="productIDS" :objects="productIDS.slice(current * 2, (current + 1) * 2)"/>

        <!-- <div class="pageControls">
            <button @click="previous()" class="btn btn-primary">Previous</button>
            <b-avatar src="https://preview.redd.it/3rfebt064zfz.jpg?auto=webp&s=cd389352fd09941f2c6ba1b396a90a05273106d9"></b-avatar>
            <button @click="next()" class="btn btn-primary">Next</button>
        </div> -->
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import ProductHolder from '@/components/ProductHolder.vue'
import { mapActions, mapState } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    Header,
    ProductHolder
  },

  data(){
    return {
      title: 'Otter Shop',
      current: 0,
    }
  },

  computed: {
    ...mapState([
      'productIDS'
    ])
  },

  methods: {
    ...mapActions([
      'fetchProducts'
    ]),

    // previous(){
    //   if(this.current > 0)
    //     this.current--;
    // },

    // next(){
    //   if(this.current * 2 < this.productIDS.length){
    //     this.current++;        
    //   }
    // }
  },

  watch: {
    $route(){
      this.fetchProducts();
    },

    // productIDS(){
    //   this.fetchProducts();
    // }
  },

  mounted() {
    console.log("HomeView mounted");
    this.fetchProducts();
  }
}
</script>


<style>
    .pageControls {
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>