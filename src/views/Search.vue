<template>
    <div>
        <Header :title="categoryname" />
        <!-- <ProductHolder v-if="productIDS" :objects="productIDS"/> -->
        <SingleProduct v-for="product in products" :key="product.id" :product="product"/>
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header.vue'
  import SingleProduct from '@/components/SingleProduct.vue'
  
  export default {
    name: 'Search',
    components: {
      Header,
      SingleProduct
    //   ProductHolder
    },
  
    data(){
      return {
        categoryname: 'Search results: ',
        productIDS: null,
        products: []
      }
    },
  
    mounted(){
      fetch(`http://localhost:1337/admin/product/findProduct/${this.$route.query.q}`)
        .then(obj => obj.json())
        .then(res => {
            for(let i=0;i<res.length;i++){
                this.products.push(res[i]);
            }
        });
    }
  }
  
  </script>
  