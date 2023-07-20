<template>
  <!-- <corouselVue class="q-ma-none"></corouselVue> -->
  <div class="row q-container q-pa-md">
    <cardVue
      class="col-6 col-sm-4 col-md-2 col-lg-6"
      v-for="(peli, index) in peliculas"
      :key="index"
      :prop="peli"
      :id="index"
      @click="linkear(peli.id_pelicula)"
    />
    <span style="" id="observado" v-on:click="inter" />
  </div>
</template>

<script>
import cardVue from "src/components/card.vue";
import { defineComponent } from "vue";
import axios from "axios";
import auth from "src/auth/index";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      searchModel: "",
      peliculas: [],
      TodasPeliculas: [],
      actual: 0,
    };
  },
  beforeCreate: async function () {
    auth(this.$route.fullPath);
    const res = await axios.get("https://ej101.azurewebsites.net/");
    const catePeli = await axios.get(
      "https://ej101.azurewebsites.net/movies/categorias/peliculas"
    );
    const isNoveda = function (fecha) {
      let fechaFin = new Date().getTime();
      let fechaInicio = new Date(fecha).getTime();
      let diff = fechaInicio - fechaFin;
      let falta = diff / (1000 * 60 * 60 * 24 * 7);
      return falta <= 21 && falta >= 0;
    };

    if (this.$route.params.id == "novedad") {

      this.peliculas =  res.data.peliculas.filter(p=> isNoveda(p.fecha_estreno))
      this.TodasPeliculas =  res.data.peliculas.filter(p=> isNoveda(p.fecha_estreno))
    } else {
      let p = catePeli.data.categorias_peliculas.filter(
        (p) => p.categoriasid_categoria == this.$route.params.id
      );
      this.peliculas = res.data.peliculas
        .filter((p) => p.id_pelicula == this.$route.params.id)
        .slice(0, this.actual + 5);
      this.TodasPeliculas = res.data.peliculas.filter(
        (p) => p.id_pelicula == this.$route.params.id
      );
    }
  },
  mounted() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const visto = (entries) => {
      if (entries[0].isIntersecting) this.inter();
    };
    const observer = new IntersectionObserver(visto, options);
    const observerHtmlElement = document.getElementById("observado");
    observer.observe(observerHtmlElement);
  },
  components: {
    cardVue,
  },
  watch: {
    peliculas: async function () {
      auth(this.$route.fullPath);
      const res = await axios.get("https://ej101.azurewebsites.net/");
      const catePeli = await axios.get(
        "https://ej101.azurewebsites.net/movies/categorias/peliculas"
      );
       const isNoveda = function (fecha) {
      let fechaFin = new Date().getTime();
      let fechaInicio = new Date(fecha).getTime();
      let diff = fechaInicio - fechaFin;
      let falta = diff / (1000 * 60 * 60 * 24 * 7);
      return falta <= 21 && falta >= 0;
    };
    if (this.$route.params.id == "noveda") {
      this.peliculas =  res.data.peliculas.filter(p=> isNoveda(p.fecha_estreno))
      this.TodasPeliculas =  res.data.peliculas.filter(p=> isNoveda(p.fecha_estreno))
    } else {
      let p = catePeli.data.categorias_peliculas.filter(
        (p) => p.categoriasid_categoria == this.$route.params.id
      );
      this.peliculas = res.data.peliculas
        .filter((p) => p.id_pelicula == this.$route.params.id)
        .slice(0, this.actual + 5);
      this.TodasPeliculas = res.data.peliculas.filter(
        (p) => p.id_pelicula == this.$route.params.id
      );
    }
    },
  },
  methods: {
    inter: function () {
      this.actual += 7;
      this.peliculas = this.TodasPeliculas.slice(0, this.actual + 5);
    },
    linkear: function (url) {
      window.location.href = "#/pelicula/" + url;
    },
  },
});
</script>
