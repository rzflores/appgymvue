<template>
 
<div>
  
    <TablaProductos titleProductos="Gestiona Tu Inventario" :isInventario="true"></TablaProductos>
   
</div>


</template>

<script>
  import  TablaProductos   from '../components/TablaProductos.vue'

  export default {
    name: 'Inventario',
    
    components: {
      TablaProductos
    },
  }
</script>
