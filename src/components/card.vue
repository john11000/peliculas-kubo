<template>
  <div class="row items-start">
    <q-tooltip
      anchor="top middle"
      class="bg-dark text-body2"
      style="height: 220px; overflow: hidden; border: 1px solid #fff"
      self="bottom middle"
      :offset="[10, 10]"
    >
      {{ prop.Descripcion }}
    </q-tooltip>
    <q-card class="my-card q-ma-sm bg-dark text-white">
      <!-- <q-video :src="prop.trailer.replace(`watch?v=`,`embed/`).split(`&`)[0]" /> -->
      <q-img
        :src="`https://b-peliculas.herokuapp.com/img/` + prop.caratula"
        :ratio="4 / 3"
        width="20"
        loading="lazy"
      />

      <q-card-section style="height: 150px; overflow: hidden">
        <div class="" style="heigth: 50px; overflow: hidden">
          {{ prop.titulo.substring(0, 25) }}
        </div>
        <div class="text-subtitle2">{{ momento(prop.fecha_estreno) }}</div>
        <ratingVue :val="prop" />
        <div class="text-overline text-h1 text-positive"> {{prop.views}} vistas</div>

        <div class="text-h6 q-mt-sm q-mb-xs">
         
        </div>

        <div class="text-caption text-grey">
                 <q-badge v-if="isNoveda(prop.fecha_estreno)" rounded color="positive" :label=" isNoveda(prop.fecha_estreno)  ? `novedad` :  null" />

        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { ref } from "vue";
import ratingVue from "./rating.vue";
import moment from "moment";
export default {
  methods: {},
  setup() {
    return {
      expanded: ref(false),
      moment: moment(),
      lorem:""
    };
  },
  methods: {
    momento: function (fecha) {
      return moment(fecha).fromNow();
    },
    isNoveda: function (fecha) {
      let fechaFin = new Date().getTime();
      let fechaInicio = new Date(fecha).getTime();
      let diff = fechaInicio- fechaFin;
      let falta = diff / (1000 * 60 * 60 * 24*7) 
      return falta <= 21 &&  falta >= 0 ;
    },
  },
  props: ["prop"],
  components: {
    ratingVue,
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
