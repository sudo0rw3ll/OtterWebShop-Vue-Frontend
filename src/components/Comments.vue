<template>
    <div>
        <h4>User comments</h4>

        <b-form-input v-model="comment" placeholder="Leave you review!" @keydown.enter="onSubmit"></b-form-input>    
        
        <b-card v-for="comment in comments" :key="comment.id">
            <b-card-text>
                <h3>{{comment.username}}</h3>
                {{comment.comment_body}}
            </b-card-text>
        </b-card>
    </div>    
</template>

<script>
    export default{
        name: 'Comments',

        props: {
            comments: Array
        },

        data() {
            return {
                comment: '',
            }
        },

        methods: {
            // ...mapActions([
            //     'postComment'
            // ]),

            onSubmit(){
                this.postComment({body: this.comment, product_id: this.product.id});
                this.comment = '';
            }
        },
    }
</script>