<template>
<div>
  <v-carousel  hide-delimiters
   hide-delimiter-background
      show-arrows-on-hover
      height="1000"
      cycle>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
     
    ></v-carousel-item>
  </v-carousel>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'https://www.precor.com/es-xl/blog/wp-content/uploads/sites/6/2014/08/Precor_In-Club_DPL_circuit_men_women_9842-retouch-770x513.jpg'
          },
          {
            src: 'https://img.lalr.co/cms/2017/08/23170231/gimnasios.jpg'
          },
          {
            src: 'https://as01.epimg.net/diarioas/imagenes/2020/08/20/actualidad/1597940367_402455_1597940487_noticia_normal.jpg'
          },
          {
            src: 'https://www.palco23.com/files//2020/19_redaccion/fitness/castilla-mancha-gimnasio-728.jpg'
          }
        ]
      }
    }
  }
</script>