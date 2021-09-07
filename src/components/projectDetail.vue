<template>
    <div>

        <b-container>

            <h1>Project Detail Page</h1>

        </b-container>

    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {

    name:'projectDetail',

    data(){
        //id que ha d'arribar per url (es el id del projecte)
        return{
            projectId:this.$route.params.id
        }
    },

    computed:{
        ...mapState(['projects']),
    },

    mounted(){
        this.$store.dispatch('getProejects');
    }

}

</script>