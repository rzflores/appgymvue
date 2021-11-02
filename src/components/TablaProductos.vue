<template>
  <div>
    <v-text-field v-if="!isInventario"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details        
      ></v-text-field>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
     :search="search"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>{{ titleProductos }} </v-toolbar-title>      
        
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template
          v-if="isInventario"
           v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
             
            
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
                      v-model="editedItem.nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.precio"
                      label="Precio"
                    ></v-text-field>
                  </v-col>
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
            <v-card-title class="text-h5">¿Deseas eliminar este producto?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Aceptar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon v-if="isInventario"
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon v-if="isInventario"
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
       <v-icon v-if="!isInventario"
        small
        @click="addProducto(item)"
      >
        mdi-plus-circle
      </v-icon>
    </template>
    <template v-slot:no-data>
      No existen Productos
    </template>
  </v-data-table>
  </div>
</template>



<script>
 import { mapState,mapMutations } from "vuex"
    let url = "http://127.0.0.1:8000/api/productos";
  export default {
      name : 'TablaProductos',
    data: () => ({
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Id',align: 'start',sortable: false,value: 'id', class:"black white--text"},
        { text: 'Nombre', value: 'nombre', class:"black white--text" },
        { text: 'Precio', value: 'precio' , class:"black white--text"},
        { text: 'Cantidad', value: 'cantidad' , class:"black white--text"},        
        { text: 'Actions', value: 'actions', sortable: false, class:"black white--text" },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {         
        nombre: '',
        precio: 0,
        cantidad: 0,
      },
      defaultItem: {
        nombre: '',
        precio: 0,
        cantidad: 0,               
      },
    }),

    computed: {
      ...mapState(['PuntoVenta','idVenta','Inventario']),
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo' : 'Editar'
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
    props : {
        titleProductos : String,
        isInventario: Boolean,
    },
    methods: {
      ...mapMutations(['aumentarIdVenta','mapearInventaraio','cambiarCantidadInventario']),
      initialize () {
          this.axios.get(url).then(response => {
                   this.desserts = response.data;                                                           
                   this.mapearInventaraio(this.desserts);
          });
          
          
      },
      

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
     
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true;
      
        this.axios.delete(url + '/' + item.id)
            .then(response =>{
                    console.log(response);
                    this.initialize();
                });
      },
      addProducto(item){
         this.editedIndex = this.desserts.indexOf(item)  
         this.aumentarIdVenta() ;          
         this.PuntoVenta.push({
           idventa : this.idVenta,
           nombre : item.nombre,
           precio : item.precio,
           cantidad : 0 ,
           total : 0
         })
         

         
         
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)            

             this.axios.put(url + '/' + this.editedItem.id,{
                nombre : this.editedItem.nombre,
                cantidad: parseInt(this.editedItem.cantidad),
                precio: parseFloat(this.editedItem.precio)
            })
            .then(response =>{
                    console.log(response);
                    this.initialize();
                });  

        } else {
            
            this.axios.post(url,{
                nombre : this.editedItem.nombre,
                cantidad: parseInt(this.editedItem.cantidad),
                precio: parseFloat(this.editedItem.precio)
                
            })
            .then(response =>{
                    console.log(response);
                    this.initialize();
                });                     
        }
        this.close()
      },
    },
  }
</script>


