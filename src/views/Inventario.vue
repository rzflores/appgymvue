<template>

<div>
    <TablaProductos :titleProductos="Productos"></TablaProductos>
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
