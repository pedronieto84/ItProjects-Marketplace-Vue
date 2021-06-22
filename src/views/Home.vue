<template>
    <b-container>
    <b-row align-v="center">
      <b-col>
        <b-card
        title="This is a card"
        img-src="https://picsum.photos/600/300/?image=25"
        img-top
        tag="article"
        style="max-width:20rem"
        class="mb-2"
        >
             <b-card-text>Lorem ipsum dolor sit amet, consectetur adipis </b-card-text>
             <b-button variant="primary">Apply</b-button>
        </b-card> 
      </b-col>
   
    </b-row>
</b-container>

</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {
  },
};
</script>
