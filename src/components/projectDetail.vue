<template>

        <b-container class="border rounded mb-5 shadow-sm" fluid>

            <!--Project Title & Publisher Name-->
            <b-row class="w-100">
                <b-col class="text-left font-weight-bold px-5 py-4"><h3>{{ projectDetall.title }}</h3></b-col>
                <b-col class="text-right px-5 py-4">{{ projectDetall.ownerId }}</b-col>
            </b-row>

            <!--Project Descripction-->
            <b-row>
                <b-col class="text-justify text-wrap px-5 py-4 border rounded mx-5 my-4 bg-light shadow-sm">{{ projectDetall.shortExplanation }}</b-col>
            </b-row>

            <!--Published & Deadline & Bind-->
            <b-row class="my-5">
                <b-col class="px-5">
                    <div class="container">
                        <b-row>
                            <b-col class="text-left">
                                Published
                                <b-row>
                                    <b-col class="text-left">
                                        {{ publishedDateFormat }}
                                    </b-col>
                                    <b-col class="text-left">
                                        <b-icon-calendar3 variant="secondary"></b-icon-calendar3>
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
                                        {{ deadlineFormat }}
                                    </b-col>
                                    <b-col>
                                        <b-icon-calendar3 variant="secondary"></b-icon-calendar3>
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

            <!--Project Techset-->
            <b-row>
                <div class="container">
                    <b-row>
                        <b-col class="pl-5 text-left">
                        Techset
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="px-5 border rounded mx-5 my-3 shadow-sm">
                            <ul class="row list-unstyled">
                                <li v-for="item in projectDetall.techSet" :key="item.id">
                                    <h5 class="mt-4 mr-4 text-center"><b-badge>{{ item }}</b-badge></h5>
                                </li>
                            </ul>
                        </b-col>
                    </b-row>
                </div>
            </b-row>

            <!--More Info-->
            <b-row class="my-5">
                <b-col>
                    <div class="container">
                        <b-row>
                            <b-col class="text-left px-5">
                            Files with more info
                                <b-row class="text-left mx-1 my-2">
                                    <b-link href="#" target="_blank" class="text-decoration-none">Mockups</b-link> <!--falta link-->
                                </b-row>
                                <b-row class="text-left text-dark mx-1 my-2">
                                    <b-link href="#" target="_blank" class="text-decoration-none">Database Design</b-link> <!--falta link-->
                                </b-row>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>

            <!--Button Back-->
            <b-row class="my-5">
                <b-col class="text-right">
                     <b-button variant="outline-secondary" size="sm" @click="anterior()"><b-icon-chevron-left></b-icon-chevron-left> Go back </b-button>
                </b-col>
            </b-row>

        </b-container>

</template>

<script>

import axios from 'axios'
import {mapGetters} from 'vuex'

export default {

    name:'projectDetail',

    data(){
        return{
            projectId:this.$route.params.id, //id que ha d'arribar per url (es el id del projecte)
            projectDetall:'',
            item:''
        }
    },

    computed:{
        ...mapGetters(['getUser']),

        publishedDateFormat(){
            const PublishedDate = new Date (this.projectDetall.publishedDate)
            return PublishedDate.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
        },

        deadlineFormat(){
            const deadline = new Date (this.projectDetall.deadline);
            return deadline.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
        },

        userId(){
            return this.getUser.userId
        }

    },

    methods:{
        anterior(){
            this.$router.go(-1)
        },
    },

    mounted(){
        axios.post('https://us-central1-asamblea-27a8d.cloudfunctions.net/getProject',{
            projectId: this.projectId,// !! He de posar "this.projectId" esta posat 'AsPYHX..' pq encara no arriba el id per url
            userId: this.userId
        })
        .then((response) => {
            this.projectDetall = response.data;
        }, (error) => {
            console.log(error);
        });
    }

}
</script>