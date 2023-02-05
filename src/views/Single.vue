<template>
    <div v-if="product" class="image">
      <h3>{{ product.title }}</h3>
  
      <img v-if="product.image" :src="product.image">
      <p v-else>Image not available</p>
  
      <ul>
        <li>Title: {{product.title}}</li>
        <li>Description: {{product.description}}</li>
        <li>Price: ${{product.price}}</li>
      </ul>

      <b-button @click="addAction()" variant="outline-success" class="float-right">Add</b-button>

      <Comments v-if="comments" :comments="comments" />
    </div>
  </template>
  
  <script>
  import {mapActions} from 'vuex';
  import Comments from '@/components/Comments.vue';

  export default {
    name: 'Single',

    data() {
        return {
            product: null,
            comments: []
        }
    },

    components: {
      Comments
    },

    methods: {
        ...mapActions([
            'getProduct',
            'addToCart'
        ]),

        addAction(){
            // e.preventDefault();

            this.addToCart(this.product);
        }
    },
    
    mounted() {
        this.getProduct(this.$route.params.id)
        .then(obj => {
            this.product = obj;
        });

        fetch(`http://localhost:1337/admin/comment/commentsForProduct/${this.$route.params.id}`)
            .then(obj => obj.json())
            .then(res => {
                let temp = [];

                for(let i=0;i<res.length;i++){
                   let username = '';
                   
                    fetch(`http://localhost:1337/admin/user/${res[i].user_id}`)
                    .then(resp => resp.json())
                    .then(obj => {
                        res[i]['username'] = obj.username;
                        console.log(res[i]);
                        temp.push(res[i]);
                    });
                }

                this.comments = temp;
                
        });
    },

  }
  </script>
  
  <style scoped>
    .image {
      margin-top: 10px;
      border-style: dashed;
      border-radius: 15px;
    }
  
    img {
      height: 500px;
      width: 500px;
    }
  </style>
  