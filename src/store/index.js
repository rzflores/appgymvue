import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    PuntoVenta : [],
    idVenta: 0,
    Inventario : [],
    validadoCantidad : true,
    NroTran:0,
    Transaccion : []
  },
  mutations: {
    ReiniciarPuntoVenta(state){
      state.PuntoVenta = [];
    },
    mapearInventaraio(state , itemInventario){
        state.Inventario = itemInventario;        
    },
    aumentarIdVenta(state){
      state.idVenta ++
    },
    aumentarNroTran(state){
      state.NroTran ++
    },
    validarCantidad(state,itemVenta){                
      state.validadoCantidad = true;
      state.Inventario.forEach(e => {
        if(e.nombre === itemVenta.nombre ){
        
            if(itemVenta.cantidad >=  e.cantidad)
            {
              state.validadoCantidad = false;
                
            }
        }
      });
      
    },
    generarTranssacion(state)
    {
        state.PuntoVenta.forEach( p => {
            state.Inventario.forEach(  i=> {
                if(p.nombre === i.nombre)
                {
                  state.Transaccion.push({
                    idTran : i.id,
                    nombreTran : i.nombre,
                    cantidadTran: i.cantidad,
                    precioTran: i.precio
                  })
                }


            })
        } );
    },


    cambiarCantidad(state,itemVenta){
      
      state.PuntoVenta.forEach(p => {
        if(p.nombre === itemVenta.nombre){
            
            p.total  = p.precio * itemVenta.cantidad;
            console.log( p );
        }
      });
      
     },
     cambiarCantidadInventario(state,itemInventario){
      state.Inventario.forEach(e => {
        if(e.nombre === itemInventario.nombre )
        {
            e.cantidad = e.cantidad - itemInventario.reduccionCantidad
        }
      });
     }
  },
  actions: {
  },
  modules: {
  }
})
