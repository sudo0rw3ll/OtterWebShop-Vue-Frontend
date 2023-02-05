<template>
    <div>
        <b-card v-if="cartProducts" v-for="cartProduct in cartProducts" :key="cartProduct.id">
            <b-card-text>
                <h3>{{cartProduct.title}}</h3>
                {{cartProduct.description}}
                <b>${{cartProduct.price}}</b>
            </b-card-text>

            <b-footer>
                <b-button @click="remove(cartProduct.id)" variant="danger">Remove from cart</b-button>
            </b-footer>
        </b-card>

        <span><b>Total price ${{total_price}} </b></span>
        <b-button @click="prepareAndPay()" variant="success">Order & Pay</b-button>
    </div>
</template>


<script>
import Header from '@/components/Header.vue'
import VueJwtDecode from 'vue-jwt-decode';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'Cart',
    comments: {
        Header,
    },

    computed: {
        ...mapState([
            'cartProducts',
            'token'
        ])
    },

    data() {
        return {
            total_price: 0
        }
    },

    methods:{
        ...mapActions([
            'removeFromCart'
        ]),

        remove(id){
            this.removeFromCart(id);
        },

        prepareAndPay(){

            let tok = VueJwtDecode.decode(this.token)

            let user_id = tok.userId;

            console.log(user_id);

            const obj = {
                user_cart_id: user_id
            }
            
            console.log(obj);


            //create cart
            fetch("http://localhost:1337/admin/cart/createCart", 
            {
                method: "POST", 
                headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',}
                , body: JSON.stringify(obj)
            })
            .then(resp => resp.json())
            .then(response => {
                let cart_id = response.id;
                
                //add cart items
                for(let i=0;i<this.cartProducts.length;i++){
                    let cart_item_obj = {
                        "quantity" : 1,
                        "cart_id" : cart_id,
                        "cart_product_id": this.cartProducts[i].id
                    };

                    fetch("http://localhost:1337/admin/cartItem/addCartItem/", 
                    {
                        method: "POST", 
                        headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',}
                        , body: JSON.stringify(cart_item_obj)
                    }).then(res => res.json())
                    .then(res => {
                        console.log("cart item added " + res);
                    });
                }

                //prepare for payment

                let payment_obj = {
                    total: this.total_price,
                    shipping: 0,
                    grand_total: this.total_price,
                    status: 'nije isporuceno',
                    user_order_id: user_id
                };
                
                // create order

                fetch('http://localhost:1337/admin/order/addOrder/', {method: "POST", headers: {'Accept' : 'application/json',
                        'Content-Type' : 'application/json'}, body:JSON.stringify(payment_obj)})
                        .then(orderres => orderres.json())
                        .then(ores => {
                            localStorage.setItem('order_id', ores.id);

                            for(let i=0;i<this.cartProducts.length;i++){
                                let order_item_obj = {
                                    "quantity" : 1,
                                    "order_id" : ores.id,
                                    "order_product_id": this.cartProducts[i].id
                                };

                                fetch("http://localhost:1337/admin/orderItem/addOrderItem/", 
                                {
                                    method: "POST", 
                                    headers: {
                                    'Accept' : 'application/json',
                                    'Content-Type' : 'application/json',}
                                    , body: JSON.stringify(order_item_obj)
                                }).then(res => res.json())
                                .then(res => {
                                    console.log("order item added " + res);
                                });
                            }
                        });
            });

            this.$router.push({name: 'Payment'});
        }
    },

    watch: {
        cartProducts(){
            this.total_price = 0;
            for(let i=0;i<this.cartProducts.length;i++){
                this.total_price += this.cartProducts[i].price;
            }
        }
    },

    mounted() {
        this.total_price = 0;
        for(let i=0;i<this.cartProducts.length;i++){
            this.total_price += this.cartProducts[i].price;
        }
        console.log(localStorage.token);
    }
}

</script>