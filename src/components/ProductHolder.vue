<template>
    <div class="productHolder">
        <div id="products_grid" class="row">
            <SingleProduct v-if="products" class="col-6 col-md-4" v-for="product in products" :key="product.id" :product="product"/>
        </div>

        <!-- <b-pagination
        v-model="currentPage"
        :total-rows="products.length"
        :per-page="perPage"
        aria-controls="products_grid"
        ></b-pagination> -->
        <div class="pageControls">
            <button @click="previous()" class="btn btn-primary">Previous</button>
            <b-avatar src="https://preview.redd.it/3rfebt064zfz.jpg?auto=webp&s=cd389352fd09941f2c6ba1b396a90a05273106d9"></b-avatar>
            <button @click="next()" class="btn btn-primary">Next</button>
        </div>
    </div>
</template>

<script>
import SingleProduct from '@/components/SingleProduct.vue';
import {mapActions, mapState} from 'vuex';

export default {
  name: 'ProductHolder',

  components:{
    SingleProduct
  },

  data() {
    return {
      products: [],
      currentPage: 1
    }
  },

  computed: {
    ...mapState([
      'productIDS',
    ])
  },

  methods: {
    ...mapActions([
      'getProduct'
    ]),

    previous(){
      if(this.currentPage > 1)
        this.currentPage--;
    },

    next(){
      if(this.currentPage * 2 < this.productIDS.length){
        this.currentPage++;        
      }
    }
  },

  mounted() {    
    console.log("ProductGallery mount");
    this.productIDS.map(prodid => {
      console.log("a");
      this.getProduct(prodid).then(res => this.products.push(res));
    });
  },

  watch: {
    currentPage(nVal){
        this.products = [];
        this.productIDS.slice((this.currentPage - 1) * 2, this.currentPage * 2).map(obj => {
          this.getProduct(obj).then(res => this.products.push(res));
        })
      },

      productIDS(nVal){
        this.currentPage = 1;
        this.products = [];

        console.log("Nval console log " + nVal);

        this.productIDS.slice((this.currentPage - 1) * 2, this.currentPage * 2).map(obj => {
          console.log("Watch productIDS -> " + obj)
          this.getProduct(obj).then(res => this.products.push(res));
        });
      }
    }
}
</script>


<style scoped>
    .pagination {
        justify-content: center;
    }
</style>