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
import  auth  from "src/auth/index";


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
    const res = await axios.get("https://ej101.azurewebsites.net/");
    this.peliculas = res.data.peliculas;
    this.TodasPeliculas = res.data.peliculas;
    console.log(this.peliculas)
     auth(this.$route.fullPath)
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
    // corouselVue,
    cardVue,
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
