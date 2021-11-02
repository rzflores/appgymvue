<template>
    

 <v-snackbar
      v-model="activeSnack"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ textSnack }}
      <v-btn
        color="secondary"
        flat
        @click="activeSnack = false"
      >
        Cerrar
      </v-btn>
 </v-snackbar>

</template>      
<script>
export default {
    name : 'mysnack',
    props :{
        textSnack : String,
        activeSnack : Boolean,
    },
    data(){
      return{
        snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        text: '',
        }
    }
}
</script>