<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <q-header elevated class="bg-dark text-white" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mx-md"
        />

        <q-toolbar-title
          v-if="$q.screen.gt.sm"
          shrink
          class="row items-center no-wrap"
          @click="$router.replace(`/login`)"
        >
          <span class="material-icons"> theaters </span>
          <span class="q-ml-sm">{{ username }} admin</span>
        </q-toolbar-title>

        <q-space />
        <q-input
          standout
          v-model="ph"
          placeholder="Click here to search something"
          class="GPL__toolbar-input bg-white"
          @keyup="filtrar()"
        >
          <template v-slot:append style="heigth: 46px">
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
            style="top: 70px; max-height: 200px"
          >
            <div
              v-for="(resultados, index) in busqueda_datos.slice(0, 10)"
              :key="index"
              class="item-hover overflow-hidden"
            >
              <div
                class="item-texto"
            
                @click="$router.replace(`/pelicula/${resultados.id_pelicula}`)"
              >
                {{ resultados.titulo }}
              </div>
            </div>
          </div>
        </q-input>

        <q-btn
          v-if="$q.screen.gt.xs"
          flat
          dense
          no-wrap
          color="primary"
          icon="menu_open"
          no-caps
          label="filtrar categoria"
          class="q-ml-sm q-px-md"
        >
          <q-menu anchor="top end" self="top end">
            <q-list class="text-grey-8" style="min-width: 100px">
              <q-item aria-hidden="true">
                <q-item-section
                  class="text-uppercase text-grey-7"
                  style="font-size: 0.7rem"
                  >elige una categoria</q-item-section
                >
              </q-item>
              <q-item
                v-for="(categoria, index) in links1"
                :key="index"
                clickable
                v-close-popup
                aria-hidden="true"
                @click="SelectedC(index)"
              >
                <q-item-section avatar>
                  <q-icon name="category" />
                </q-item-section>
                <q-item-section>{{
                  categoria.nombre_categoria
                }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn
          v-if="$q.screen.gt.xs"
          flat
          dense
          no-wrap
          color="primary"
          icon="add"
          no-caps
          label="Create"
          class="q-ml-sm q-px-md"
        >
          <q-menu anchor="top end" self="top end">
            <q-list class="text-grey-8" style="min-width: 100px">
              <q-item aria-hidden="true">
                <q-item-section
                  class="text-uppercase text-grey-7"
                  style="font-size: 0.7rem"
                  >Create New</q-item-section
                >
              </q-item>
              <q-item
                v-for="menu in createMenu"
                :key="menu.text"
                clickable
                v-close-popup
                aria-hidden="true"
                @click="menu.url != `` ? $router.replace(menu.url) : null"
              >
                <q-item-section avatar :disable="menu.url != ``">
                  <q-icon :name="menu.icon" />
                </q-item-section>
                <q-item-section>{{ menu.text }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="text-grey-7" icon="apps">
            <q-tooltip>categorias</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      class="bg-dark text-white"
      behavior="mobile"
      @click="leftDrawerOpen = false"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="GPL__toolbar">
          <q-toolbar-title class="row items-center text-white">
            modo admin
          </q-toolbar-title>
        </q-toolbar>
        <q-btn color="negative" @click="salir()">
          cerrar session
          <template v-slot:loading>
            <q-spinner-radio />
          </template>
        </q-btn>
        <q-separator class="q-my-md" />
        administrar
        <q-list padding class="text-white">
          <q-item clickable disable class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon name="movie_filter" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-white">usuarios</q-item-label>
            </q-item-section>
          </q-item>

          <q-item disable class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon name="movie_filter" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-white">categorias</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            class="GPL__drawer-item"
            @click="$router.replace(`/administracion/panel/movie/create`)"
          >
            <q-item-section avatar>
              <q-icon name="movie_filter" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-white">peliculas</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-separator class="q-my-md" />
        categorias

        <q-list padding class="text-white">
          <q-item
            v-for="link in links1"
            :key="link.id_categoria"
            clickable
            @click="
              link.id_categoria == 1
                ? $router.replace(`/administracion/panel/`)
                : $router.replace(
                    `/administracion/panel/categoria/${link.id_categoria}`
                  )
            "
            class="GPL__drawer-item"
          >
            <q-item-section avatar>
              <q-icon name="movie_filter" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-white">{{
                link.nombre_categoria
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />
          @jhon anderson 2022
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view />

      <q-page-sticky v-if="$q.screen.gt.sm" expand position="left">
        <div class="fit q-pt-xl q-px-sm column">
          <q-btn
            round
            flat
            color="white"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
            @click="$router.replace(`/administracion/panel/categoria/noveda`)"
          >
            <q-icon size="22px" name="assistant" />
            <div class="GPL__side-btn__label">novedades</div>
            <q-badge
              floating
              color="red"
              text-color="white"
              style="top: 8px; right: 16px"
            >
              3 w
            </q-badge>
          </q-btn>
        </div>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import auth from "src/auth/index";
import axios from "axios";

export default {
  name: "GooglePhotosLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const storage = ref(0.26);
    const username = "as";
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      username,
      leftDrawerOpen,
      search,
      searchModel: "",
      busqueda_datos: [],
      busqueda: [],
      ph: ref(""),
      storage,
      links1: [],
      categoriaSelected: "",
      categorias_peliculas: [],
      createMenu: [
        {
          icon: "movie",
          text: "Movie",
          url: "/administracion/panel/movie/create",
        },
      ],
      toggleLeftDrawer,
    };
  },
  beforeCreate: async function () {
    auth(this.$route.fullPath, this.$store);
    const res = await axios.get("https://ej101.azurewebsites.net/movies/categorias");
    const res2 = await axios.get("https://ej101.azurewebsites.net/");
    const categorias_peliculas = await axios.get(
      "https://ej101.azurewebsites.net/movies/categorias/peliculas"
    );
    this.categorias_peliculas = categorias_peliculas.data.categorias_peliculas;

    this.busqueda = res2.data.peliculas;
    this.links1 = res.data.categorias;

    if (localStorage.getItem("usuario")) {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      this.username = usuario.username;
    }
  },
  methods: {
    salir: function () {
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
      auth(this.$route.fullPath);
    },
    filtrar: function () {
      if (this.ph == "") {
        this.busqueda_datos = [];
      } else {
       this.busqueda_datos = [];

        if (this.categoriaSelected != "" || this.categoriaSelected != 0) {
          let admitidas = this.categorias_peliculas.filter(
            (c) => c.categoriasid_categoria == this.categoriaSelected
          );
        const a = admitidas.map((a) => {
            return this.busqueda.map((p) => {
              if (a.peliculasid_pelicula == p.id_pelicula) {
                return p;
              }
            });
          })[0];
          if(a){
            this.busqueda_datos = a.filter(b=> b != undefined)
          }else{
            this.busqueda_datos = []
          }
        } else {
      this.busqueda_datos = this.busqueda;
          this.busqueda_datos = this.busqueda_datos.filter((b) =>
            b.titulo.toLowerCase().includes(this.ph.toLowerCase())
          );
        }
      }
    },
    SelectedC: function (category) {
      this.categoriaSelected = category;
      console.log(category);
    },
  },
};
</script>

<style lang="sass">
.GPL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 35%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368
    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px
  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500
  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>

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
