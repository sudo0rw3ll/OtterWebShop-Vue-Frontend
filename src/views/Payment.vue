<template>
    <div id="app">
        <h1>Create payment</h1>
        <b-form @submit="onSubmit">
            <b-form-group label="Card holder name:" label-for="owner_name">
                <b-form-input id="owner_name" v-model="form.owner_name" type="text" placeholder="Enter Owner name" required></b-form-input>
            </b-form-group>

            <b-form-group label="Expire date:" label-for="expire_date">
                <b-form-input id="expire_date" v-model="form.expire_date" type="text" placeholder="Enter expire date" required></b-form-input>
            </b-form-group>

            <b-form-group label="Card number:" label-for="card_number">
                <b-form-input id="card_number" v-model="form.card_number" type="text" placeholder="Enter card number" required></b-form-input>
            </b-form-group>

            <b-form-group label="Card cvv:" label-for="cvv">
                <b-form-input id="cvv" v-model="form.cvv" type="number" placeholder="Enter cvv" required></b-form-input>
            </b-form-group>
            <br>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import VueJwtDecode from 'vue-jwt-decode';

    export default {
        name: 'Payment',

        data(){
            return {
                form: {
                    owner_name: '',
                    expire_date: '',
                    card_number: '',
                    cvv: ''
                }
            }
        },

        computed: {
            ...mapState([
                'token'
            ])
        },

        methods: {
            onSubmit(e){
                e.preventDefault();

                this.createPayment();

                this.$router.push({name: 'Home'});
            },

            createPayment(){
                this.form['transcation_user_id'] =  VueJwtDecode.decode(this.token).userId;
                this.form['order_payment_id'] = parseInt(localStorage.order_id);

                let usrid = VueJwtDecode.decode(this.token).userId;

                console.log(usrid);

                let transaction = {
                    expire_date : this.form.expire_date,
                    cvv: this.form.cvv,
                    card_number: this.form.card_number,
                    owner_name: this.form.owner_name,
                    order_payment_id: parseInt(localStorage.order_id),
                    transaction_user_id: VueJwtDecode.decode(this.token).userId,
                    status: 'placeno'
                }

                console.log("Transakcija " + transaction);

                fetch('http://localhost:1337/admin/transaction/addTransaction', {method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify(transaction)})
                    .then(resp => resp.json())
                    .then(res => {
                        if(res.msg){
                            alert(res.msg);
                        }else{
                            console.log("Created transcation " + res);
                        }
                     });
            }
        }
    }
</script>