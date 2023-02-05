<template>
    <div id="app">
        <Header subtitle="Create account"/>

        <b-form @submit="onSubmit">
            <b-form-group label="First name:" label-for="name">
                <b-form-input id="name" v-model="form.name" type="text" placeholder="Enter first name" required></b-form-input>
            </b-form-group>

            <b-form-group label="Last name:" label-for="surname">
                <b-form-input id="surname" v-model="form.surname" type="text" placeholder="Enter last name" required></b-form-input>
            </b-form-group>

            <b-form-group label="Email address:" label-for="email">
                <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
            </b-form-group>

            <b-form-group label="Username:" label-for="username">
                <b-form-input id="username" v-model="form.username" type="text" placeholder="Enter username" required></b-form-input>
            </b-form-group>

            <b-form-group label="Password:" label-for="password">
                <b-form-input id="password" v-model="form.password" type="password" placeholder="Enter password" required></b-form-input>
            </b-form-group>

            <b-form-group label="Location:" label-for="location_id">
                <b-form-input id="location_id" v-model="form.location_id" type="text" placeholder="Enter address" required></b-form-input>
            </b-form-group>

            <b-form-group label="Phone number:" label-for="mobile_phone">
                <b-form-input id="mobile_phone" v-model="form.mobile_phone" type="text" placeholder="Enter phonenumber" required></b-form-input>
            </b-form-group>

            <br>
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue'
    import {mapActions} from 'vuex';

    export default {
        name: 'Register',

        components: {
            Header
        },

        data(){
            return {
                form: {
                    email: '',
                    name: '',
                    surname: '',
                    password: '',
                    username: '',
                    mobile_phone: '',
                    location_id: ''
                }
            }
        },

        methods: {
            ...mapActions([
                'register'
            ]),

            onSubmit(e){
                e.preventDefault();

                console.log(this.form);

                let register_obj = {
                    name: this.form.name,
                    surname: this.form.surname,
                    username: this.form.username,
                    password: this.form.password,
                    mobile_phone: this.form.mobile_phone,
                    role_id: 3,
                    location_id: this.form.location_id
                };

                this.register(register_obj);

                this.$router.push({name: 'Home'});
            }
        }
    }
</script>
