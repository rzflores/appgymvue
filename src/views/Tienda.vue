<template>

<div>
  <v-container>
    <v-row>

    </v-row>
    <v-row>
      <v-col>

      </v-col>
      <v-col>
        <TablaProductos :titleProductos="Inventario"></TablaProductos>  
      </v-col>
    </v-row>


  </v-container>
  
      
</div>


</template>

<script>
  import  TablaProductos   from '../components/TablaProductos.vue'

  export default {
    name: 'Tienda',

    components: {
       TablaProductos
    },
  }
</script>
