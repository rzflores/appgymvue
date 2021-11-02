<template>

<div>
  <v-container>
   
    <v-row>
      <v-col>
        <v-row>
          <h1>Punto de Venta</h1>
        </v-row>
                <v-row>
           <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
           </v-menu>          
        </v-row>
        <v-row>
          <v-data-table
            :headers="headers"
            :items="desserts"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-spacer></v-spacer>
                <v-dialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.cantidad"
                              label="Cantidad"
                            ></v-text-field>
                          </v-col>
                        
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                      >
                        Guardar       
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">¿Desea Eliminar el Producto?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
             <template v-slot:no-data>
              Agregue sus productos
            </template>


          </v-data-table>
                  
                </v-row>
              </v-col>
              <v-col>
                <TablaProductos titleProductos="Inventario" :isInventario="false"></TablaProductos>  
              </v-col>
            </v-row>
            <v-row>
              <v-btn block
                elevation="2"
                color="primary"
                @click="grabar"
                >

                Grabar
              </v-btn>
            </v-row>

          </v-container>

          <mysnack  :textSnack="textMySnack" :activeSnack="activeMySnack"></mysnack>
</div>


</template>

<script>
  import  TablaProductos   from '../components/TablaProductos.vue'
  import  mysnack   from '../components/snackbar.vue'
  import { mapState  , mapMutations} from "vuex"

  export default {
    name: 'Tienda',    
    components: {
       TablaProductos,
       mysnack
    },
     computed: {
       ...mapState(['PuntoVenta','idVenta','validadoCantidad','NroTran','Transaccion']),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Editar Cantidad'
      },
    },
      watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      ...mapMutations(['cambiarCantidad','validarCantidad','cambiarCantidadInventario','aumentarNroTran','ReiniciarPuntoVenta','generarTranssacion']),
      initialize () {
        this.desserts = this.PuntoVenta;
      },
      
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)        
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })

        

      },

      save () {
        if (this.editedIndex > -1) {          
         
       
        this.validarCantidad(this.editedItem);
           

       
          if(this.validadoCantidad === true && this.editedItem.cantidad !== 1)
          {
                
                Object.assign(this.desserts[this.editedIndex], this.editedItem)              
               this.cambiarCantidad(this.editedItem)
                this.cambiarCantidadInventario({
               ...this.editedItem , 
              reduccionCantidad : this.editedItem.cantidad 
               
            })
           }
           else{
             this.activeMySnack = true;   
             this.textMySnack  = "Supera la cantidad de productos del inventario."    
           }
          
          
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },

      grabar(){
         
          let url = "http://127.0.0.1:8000/api/ventas";
            this.PuntoVenta.forEach(item => {
               this.aumentarNroTran(); 
            this.axios.post(url,{
                numeroTran : this.NroTran.toString(),
                fecha: this.date,
                nombre: item.nombre,
                precio: parseFloat(item.precio),
                cantidad: parseFloat(item.cantidad),
                total: parseFloat(item.total),
            })
            .then(response =>{
                    console.log(response);                    
                });                   
            });
            
            let urlProductos = " http://127.0.0.1:8000/api/productos/"

            this.generarTranssacion();
            this.Transaccion.forEach(e => {              
               this.axios.put(urlProductos + e.idTran,{
                nombre : e.nombreTran,
                cantidad: parseFloat(e.cantidadTran),
                precio: parseFloat(e.precioTran),
            })
             .then(response =>{
                    console.log(response);                    
                });                   
            });




            this.ReiniciarPuntoVenta();
            this.initialize();
            this.textMySnack = "Se agrego Correctamente.";     
            this.activeMySnack = true; 
              

      }
    },
    data(){
      return{
        activeMySnack:false,
        // snackbar: false,
        // y: 'top',
        // x: null,
        // mode: '',
        // timeout: 6000,
        // text: 'Supera la cantidad de Productos',
        textMySnack : '',

      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
       dialog: false,
      dialogDelete: false,
      headers: [
         { text: 'IdVenta',sortable: false,value: 'idventa',},
        { text: 'Nombre',align: 'start',sortable: false,value: 'nombre',},
        { text: 'Precio', value: 'precio',sortable: false },
        { text: 'Cantidad', value: 'cantidad' ,sortable: false },
        { text: 'Total', value: 'total',sortable: false  },        
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        nombre: '',
        precio: 0,
        cantidad: 0,
        total: 0,        
      },
      defaultItem: {
         nombre: '',
        precio: 0,
        cantidad: 0,
        total: 0,     
      },
      }
    }
    
    
  }
  
</script>
