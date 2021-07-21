<template>
     <b-container fluid>
         <div class="d-flex align-items-center justify-content-center">
            <!--published-->
            <b-row class="m-1">
            <b-col sm="12">
                <label>Published: </label>
            </b-col>
            <b-col>
                <b-form-input type="date"></b-form-input>
            </b-col>
            </b-row>
            <!--deadline-->
            <b-row class="m-1">
            <b-col sm="12">
                <label>Deadline: </label>
            </b-col>
            <b-col>
                <b-form-input type="date"></b-form-input>
            </b-col>
            </b-row>
            <!--price-->
            <b-row class="mt-4">
            <b-col>
                <b-form-input type="number" placeholder="Bid In Euros"></b-form-input>
            </b-col>
            </b-row>
        </div>
        <div class="add-technology m-5">
              <b-row class="my-1">
      <b-col sm="6">
        <label>Add technology needed / desired </label>
      </b-col>
      <b-col sm="5">
        <b-form-input type="text"></b-form-input>
      </b-col>
      <b-col sm="1">
        <b-button pill variant="info">+</b-button>
      </b-col>
    </b-row>
        </div>
        <div class="tech-set border d-flex p-3 m-2">
            <div class="technology d-flex align-items-center m-2 p-1 bg-danger rounded">
                <p>technolgia</p>
            <b-button pill variant="info">-</b-button>
            </div>
          <div class="technology d-flex align-items-center m-2 p-1 bg-danger rounded">
                <p>technolgia</p>
            <b-button pill variant="info">-</b-button>
            </div>
            <div class="technology d-flex align-items-center m-2 p-1 bg-danger rounded">
                <p>technolgia</p>
            <b-button pill variant="info">-</b-button>
            </div>
            
        </div>
        <div class="navigation">
            <div class="d-flex justify-content-between mt-3" >
                <b-button pill variant="outline-danger">Back</b-button>
          <b-button pill variant="outline-danger">Next</b-button>
        </div>
        </div>
  </b-container>
</template>
<script>
export default {
   mounted:{
       
   }
}
</script>