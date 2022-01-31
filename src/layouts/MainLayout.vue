<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="q-py-sm bg-dark text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          class="text-white"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-white text-uppercase text-h5"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-film"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z"
            />
          </svg>
          Jhon movies</q-toolbar-title
        >

        <q-toolbar-title
          class="col-6 q-mx-auto col-sm-4"
          style="margin-right: 0"
        >
          <q-input
            standout
            v-model="ph"
            placeholder="Click here to search something"
            class="bg-grey-8 text-center rounded-borders"
            @keyup="filtrar"
          >
            <template v-slot:append>
              <q-icon v-if="ph === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="
                  ph = '';
                  busqueda_datos = [];
                "
              />
            </template>
            <div
              class="busqueda fixed bg-white overflow-auto z-max col-11 q-mx-auto col-sm-4"
              style="top: 70px; right: 0px; max-height: 200px"
            >
              <div
                v-for="(resultados, index) in busqueda_datos.slice(0, 10)"
                :key="index"
                class="item-hover overflow-hidden"
                @click="link(resultados.url)"
              >
                <div class="item-texto">{{ resultados.nombre_categoria }}</div>
              </div>
            </div>
          </q-input>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <hr />

    <q-drawer
      v-model="leftDrawerOpen"
      behavior="mobile"
      show-if-above
      bordered
      class="text-white bg-dark"
    >
      <q-list>
        <div class="text-center">
          <q-btn
            color="black"
            @click="link(`#/login`)"
            class="q-ma-sm"
            label="iniciar session"
          ></q-btn>
        </div>
        <q-item-label class="text-white bg-dark" header>
          Categorias</q-item-label
        >

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link"
          v-bind="link"
          target="_self"
          class="text-white bg-dark"
        />
      </q-list>
    </q-drawer>

    <q-page-container style="overflow: hidden">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import axios from "axios";

// const linksList = [
//   {
//     title: "Inicio",
//     caption: "quasar.dev",
//     icon: "border_all",
//     link: "#/",
//   },
//   {
//     title: "Acción",
//     caption: "quasar.dev",
//     icon: "liquor",
//     link: "#/Acción",
//   },
//   {
//     title: "Ciencia Ficción",
//     caption: "quasar.dev",
//     icon: "face",
//     link: "#/Ciencia Ficción",
//   },
//   {
//     title: "Comedia",
//     caption: "quasar.dev",
//     icon: "pedal_bike",
//     link: "#/Comedia",
//   },

//   {
//     title: "Películas actuales",
//     caption: "quasar.dev",
//     icon: "pool",
//     link: "#/documental",
//   },

//   {
//     title: "Fantasía",
//     caption: "quasar.dev",
//     icon: "computer",
//     link: "#/Fantasía",
//   },

//   {
//     title: "Musical",
//     caption: "quasar.dev",
//     icon: "kitchen",
//     link: "#/Musical",
//   },
//   {
//     title: "Películas antiguas",
//     caption: "quasar.dev",
//     icon: "emoji_objects",
//     link: "#/Películas antiguas",
//   },
//   {
//     title: "Informática",
//     caption: "quasar.dev",
//     icon: "settings_ethernet",
//     link: "#/informatica",
//   },
//   {
//     title: "Estrenos",
//     caption: "quasar.dev",
//     icon: "music_note",
//     link: "#/musica",
//   },
//   {
//     title: "Clásicos",
//     caption: "quasar.dev",
//     icon: "smart_toy",
//     link: "#/juegos",
//   },
//   {
//     title: "Mudas",
//     caption: "quasar.dev",
//     icon: "fitbit",
//     link: "#/joyerias",
//   },
//   {
//     title: "Películas en blanco y negro",
//     caption: "quasar.dev",
//     icon: "menu_book",
//     link: "#/libros",
//   },
//   {
//     title: "Películas en blanco y negro",
//     caption: "quasar.dev",
//     icon: "pets",
//     link: "#/mascotas",
//   },
//   {
//     title: "Ropa y accesorios",
//     caption: "quasar.dev",
//     icon: "checkroom",
//     link: "#/ropa",
//   },
//   {
//     title: "aventuras",
//     caption: "quasar.dev",
//     icon: "data_object",
//     link: "#/software",
//   },
//   {
//     title: "Dramáticas",
//     caption: "quasar.dev",
//     icon: "data_object",
//     link: "#/Dramáticas",
//   },
//   {
//     title: "terror",
//     caption: "quasar.dev",
//     icon: "data_object",
//     link: "#/terror",
//   },
//   {
//     title: "Infantiles",
//     caption: "quasar.dev",
//     icon: "data_object",
//     link: "#/Infantiles",
//   },
// ];


import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },
   setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: [],
      leftDrawerOpen,
      searchModel: "",
      busqueda_datos: [],
      busqueda: [],
      ph: ref(""),
      dense: ref(false),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  beforeCreate: async function () {
    const res = await axios.get("https://b-peliculas.herokuapp.com/movies/categorias");
    this.busqueda = res.data.categorias;
    this.essentialLinks = res.data.categorias
  },
  methods: {
    link: function (l) {
      window.location.href = l;
    },
    filtrar: function () {
      if (this.ph == "") {
        this.busqueda_datos = [];
      } else {
        this.busqueda_datos = this.busqueda;
        this.busqueda_datos = this.busqueda_datos.filter((b) =>
          b.nombre_categoria.toLowerCase().includes(this.ph.toLowerCase())
        );
      }
    },
  },
 
});
</script>

<style scoped>
.item-hover {
  padding: 15px;
}
.item-hover:hover {
  background: #000000;
  color: rgb(255, 255, 255);
}
.item-texto {
  width: 150%;

  height: 100%;
}
.item-texto:hover {
  position: relative;

  animation: textM 5s;
}
.busqueda::-webkit-scrollbar {
  background: #ffffff;
  width: 3px;
  height: 3px;
}

.busqueda::-webkit-scrollbar-thumb {
  background: rgb(34, 33, 33);
  border-radius: 4px;
}

/* Cambiamos el fondo y agregamos una sombra cuando esté en hover */
.busqueda::-webkit-scrollbar-thumb:hover {
  background: #b3b3b3;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
}

/* Cambiamos el fondo cuando esté en active */
.busqueda::-webkit-scrollbar-thumb:active {
  background-color: #161111;
}

@keyframes textM {
  0% {
    left: 0%;
  }
  50% {
    left: -30%;
  }
  100% {
    left: 0%;
  }
}
</style>
