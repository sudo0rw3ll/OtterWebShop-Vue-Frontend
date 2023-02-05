<template>
    <b-card class="product_card" :title="product.title" :img-src="product.image" img-height="500"
          img-width="500" img-top>
        <b-card-text>
            {{product.description}}
        </b-card-text>
        <template #footer>
            <p>${{product.price}}</p>
            <b-button @click="addAction" variant="outline-success" class="float-right">Add</b-button>
            <b-button @click="about" variant="outline-warning" class="float-left">Details</b-button>
        </template>
    </b-card>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "SingleProduct",
        
        props: {
            product: Object
        },

        methods: {
            ...mapActions([
            'getProduct',
            'addToCart'
            ]),

            about(e){
                e.preventDefault();

                this.$router.push({name: 'Single', params: {id: this.product.id}});
            },

            addAction(){

                this.addToCart(this.product);
            }
        }
        
    }
</script>

<style>
    .product_card {
        max-width: 15rem;
        margin-top: 20px;
        margin-left: 30px;
        margin-bottom: 10px;
    }
</style>