<template>
  <div>
    <div class="py-12 px-4">
      <div class="...">
        <div
          @drop.prevent="onDroppedFiles"
          @dragover.prevent="dragging = true"
          @dragleave.prevent="dragging = false"
          :class="[ dragging ? 'border-indigo-500' : 'border-gray-400', 'flex']"></div>
        <!-- <svg...> -->

          <p class="...">Drop files to upload</p>

          <p class="...">or</p>

          <label class="...">
            Select files
            <input type="file" name="file" multiple class="sr-only">
          </label>


        </div>
    </div>
    
  </div>
</template>

<script>


export default {
  data: function () {
    return {
      dragging: false,
      project3:{
        filesArray: []
      }
    };
  },
  methods: {
    onDroppedFiles($event){
      let files = [...$event.dataTransfer.items];
      this.proyect3.filesArray = 
      console.log(files);
    }
  },
  components: {
  },
};
</script>