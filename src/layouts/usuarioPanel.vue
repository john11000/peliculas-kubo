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
        >
          <span class="material-icons"> theaters </span>
          <span class="q-ml-sm">jhon movies usuario</span>
        </q-toolbar-title>

        <q-space />

        <q-input
          class="GPL__toolbar-input bg-white"
          dense
          standout="bg-primary"
          v-model="search"
          placeholder="Search"
        >
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </q-input>



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
            modo usuario
          </q-toolbar-title>
        </q-toolbar>
        <q-btn color="negative" class="q-ma-auto q-ma-sm" @click="salir()">
          cerrar session
          <template v-slot:loading>
            <q-spinner-radio />
          </template>
        </q-btn>

        <q-list padding class="text-white">
          <q-item
            v-for="link in links1"
            :key="link.id_categoria"
            clickable
            @click="link.id_categoria == 1 ?  $router.replace(`/panel/`) : $router.replace(`/panel/categoria/${link.id_categoria}`)"
            class="GPL__drawer-item"
          >
            <q-item-section avatar>
              <q-icon name="movie_filter" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-white">{{ link.nombre_categoria }}</q-item-label>
            </q-item-section>
          </q-item>

          
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
          >
            <q-icon size="22px" name="photo" />
            <div class="GPL__side-btn__label">Photos</div>
          </q-btn>

          <q-btn
            round
            flat
            color="white"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
          >
            <q-icon size="22px" name="collections_bookmark" />
            <div class="GPL__side-btn__label">Albums</div>
          </q-btn>

          <q-btn
            round
            flat
            color="white"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
          >
            <q-icon size="22px" name="assistant" />
            <div class="GPL__side-btn__label">Assistant</div>
            <q-badge
              floating
              color="red"
              text-color="white"
              style="top: 8px; right: 16px"
            >
              1
            </q-badge>
          </q-btn>

          <q-btn
            round
            flat
            color="white"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
          >
            <q-icon size="22px" name="group" />
            <div class="GPL__side-btn__label">Sharing</div>
          </q-btn>

          <q-btn
            round
            flat
            color="white"
            stack
            no-caps
            size="26px"
            class="GPL__side-btn"
          >
            <q-icon size="22px" name="import_contacts" />
            <div class="GPL__side-btn__label">Photo books</div>
          </q-btn>
        </div>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import auth from "src/auth/index";
import axios from "axios"
export default {
  name: "GooglePhotosLayout",
  setup() {
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const storage = ref(0.26);
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    
    return {
      leftDrawerOpen,
      search,
      storage,
      links1: [ ],
      createMenu: [
        { icon: "photo_album", text: "Album" },
        { icon: "people", text: "Shared Album" },
        { icon: "movie", text: "Movie" },
        { icon: "library_books", text: "Animation" },
        { icon: "dashboard", text: "Collage" },
        { icon: "book", text: "Photo book" },
      ],
      toggleLeftDrawer,
    };
  },
  beforeCreate: async function () {
    auth(this.$route.fullPath);

      const res = await axios.get("https://ej101.azurewebsites.net/movies/categorias")
    this.links1 = res.data.categorias
     const res2 = await axios.get("https://ej101.azurewebsites.net/");
    this.busqueda = res2.data.categorias;
  },methods:{
      salir:function (){
          localStorage.removeItem("usuario");
          localStorage.removeItem("token");
         auth(this.$route.fullPath);
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
    }
  }
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
