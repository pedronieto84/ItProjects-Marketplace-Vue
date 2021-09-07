<template>

        <b-container class="border" fluid>
            <b-row class="w-100">
                <b-col class="text-center px-5 py-5">{{projectDetall.title}}</b-col>
                <b-col class="text-center px-5 py-5">FALTA PublisherName</b-col>
            </b-row>

            <b-row>
                <b-col class="text-center px-5 py-5">{{projectDetall.shortExplanation}}</b-col>
            </b-row>

            <b-row>
                <b-col class="text-center px-5 py-5">{{projectDetall.publishedDate}}</b-col>
                <b-col class="text-center px-5 py-5">{{projectDetall.deadline}}</b-col>
                <b-col class="text-center px-5 py-5">{{projectDetall.bid}} Bind</b-col>
            </b-row>

            <b-row>
                <b-col class="text-center px-5 py-5">{{projectDetall.techSet}}</b-col>
            </b-row>

        </b-container>

</template>

<script>
import axios from 'axios'

export default {

    name:'projectDetail',

    data(){
        //id que ha d'arribar per url (es el id del projecte)
        return{
            projectId:this.$route.params.id,
            projectDetall:''
        }
    },

    mounted(){
        axios.post('https://us-central1-asamblea-27a8d.cloudfunctions.net/getProject',{
            projectId: 'AsPYHXBrUje4zRHcBNpd',// this.projectId
            userId:'WUnYiEbXKkLhG2FptA1p',//
        })
        .then((response) => {
            console.log(response.data);
            this.projectDetall=response.data;
        }, (error) => {
            console.log(error);
        });
    }

}

</script>