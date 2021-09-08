<template>

        <b-container class="border" fluid>
            <b-row class="w-100">
                <b-col class="text-left px-5 py-4 font-weight-bolder"><h4>{{projectDetall.title}}</h4></b-col>
                <b-col class="text-right px-5 py-4">FALTA PublisherName</b-col>
            </b-row>

            <b-row>
                <b-col class="text-justify text-wrap px-5 py-4 border mx-5 my-3 bg-light">{{projectDetall.shortExplanation}}</b-col>
            </b-row>

            <b-row>
                <b-col class="px-5">
                    <div class="container">
                        <b-row>
                            <b-col class="text-left">
                                Published
                                <b-row>
                                    <b-col>
                                        {{ projectDetall.publishedDate }}
                                    </b-col>
                                    <b-col>
                                        <b-icon-calendar3></b-icon-calendar3>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>

                <b-col class="px-5">
                    <div class="container">
                        <b-row>
                            <b-col class="text-left">
                                Deadline
                                <b-row>
                                    <b-col>
                                        {{ projectDetall.deadline }}
                                    </b-col>
                                    <b-col>
                                        <b-icon-calendar3></b-icon-calendar3>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>

                <b-col class="px-5">
                    <div class="container">
                        <b-row>
                            <b-col class="text-left">
                                Bid in Euros
                                <b-row class="ml-1">
                                {{}}<!--falta-->
                                </b-row>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>

            <b-row>
                <b-col class="text-justify text-wrap px-5 py-3 border mx-5 my-3">
                    <ul class="row list-unstyled">
                        <li v-for="item in projectDetall.techSet" :key="item.id">
                            <h5 class="mx-4"><b-badge>{{ item }}</b-badge></h5>
                        </li>
                    </ul>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <div class="container">
                        <b-row>
                            <b-col class="text-left px-5">
                            Files with more info
                                <b-row class="text-left mx-1">
                                    link <!--falta link-->
                                </b-row>
                                <b-row class="text-left mx-1">
                                    link <!--falta link-->
                                </b-row>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>



        </b-container>

</template>

<script>
import axios from 'axios'

export default {

    name:'projectDetail',

    data(){
        return{
            projectId:this.$route.params.id, //id que ha d'arribar per url (es el id del projecte)
            projectDetall:'',
            item:'',
        }
    },

    mounted(){
        axios.post('https://us-central1-asamblea-27a8d.cloudfunctions.net/getProject',{
            projectId: 'AsPYHXBrUje4zRHcBNpd',// !! He de posar "this.projectId" esta posat 'AsPYHX..' pq encara no arriba el id per url
            userId:'WUnYiEbXKkLhG2FptA1p',//??
        })
        .then((response) => {
            console.log(response.data);//Borrar
            this.projectDetall = response.data;
        }, (error) => {
            console.log(error);
        });
    }

}
</script>