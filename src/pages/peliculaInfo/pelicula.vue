<template>
  <div class="q-ma-sm">
    <q-card class="my-card bg-dark" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs col-6 text-center">
          <div class="text-overline">informacion de la pelicula</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ name }}</div>
          <div class="text-caption text-grey">
            {{ descripcion }}
          </div>
          <br />
          <span>duraccion  : {{pelicula.duracion}}</span>
          <br />

          <span>fecha de estreno {{ momento(pelicula.fecha_estreno) }}</span>
          <br />

          <q-rating
            v-model="calificacion"
            max="5"
            size="2.5em"
            color="yellow"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
            no-dimming
            class="q-mb-lg"
            readonly
          />
          <br />
           {{genteCalificacion.length}}  vista
          <br />
          {{genteCalificacion.length}}
          {{
            pelicula.calificacion == 0
              ? "se el primero en calificarla "
              : "calificacion"
          }}
          <q-separator inset />
          <q-form @submit="calificar" class="q-gutter-md q-mt-lg">
            <q-checkbox left-label v-model="vista" label="pelicula vista" />
            <q-rating
              name="quality"
              v-model="myCalifiacion"
              max="5"
              size="1.5em"
              color="yellow"
              icon="star_border"
              icon-selected="star"
              no-dimming
            />

            <div>
              <q-btn
                label="calificar"
                type="submit"
                color="primary"
                v-if="user"
              />
              <q-btn
                label="iniciar session"
                @click="$router.replace(`/login`)"
                type="submit"
                color="primary"
                v-if="!user"
              />
            </div>
          </q-form>
        </q-card-section>
        <q-card-section class="col-5 flex flex-center">
          <q-img
            class="rounded-borders"
            :src="`https://app-7c7abf18-8298-4713-a5f3-1861e51324b6.cleverapps.io/img/` + pelicula.caratula"
          />
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat>{{ pelicula.fecha_estreno.substr(0, 10) }} </q-btn>
        <q-btn flat color="primary" disable> Reserve </q-btn>
      </q-card-actions>
      <hr />
      <div class="q-pa-md q-mx-auto desktop-only" style="width: 50%">
        <q-video
          :ratio="16 / 9"
          :src="pelicula.trailer.replace(`watch?v=`, `embed/`).split(`&`)[0]"
        />
      </div>
      <div class="q-pa-md q-mx-auto desktop-hide">
        <q-video
          :ratio="16 / 9"
          :src="pelicula.trailer.replace(`watch?v=`, `embed/`).split(`&`)[0]"
        />
      </div>
      <p class="text-center text-uppercase">{{ name }}</p>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";
import moment from "moment";
import axios from "axios";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      pelicula: {
        Descripcion: "",
        calificacion: 5,
        caratula: "",
        duracion: "00:00:00",
        fecha_estreno: "2022-01-03T05:00:00.000Z",
        id_pelicula: 5,
        titulo: "",
        trailer: "",
        views: 0,
      },
      $store: useStore(),
      trailer: "",
      name: "",
      descripcion: "",
      slide: ref(1),
      autoplay: ref(true),
      ratingModel: ref(3),
      myCalifiacion: ref(0),
      vista: true,
      user: JSON.parse(localStorage.getItem("usuario")),
      calificacion : "",
      history :[],
      $q : useQuasar(),
      genteCalificacion:[]

    };
  },
  beforeCreate: async function () {
    const res = await axios.get("https://app-7c7abf18-8298-4713-a5f3-1861e51324b6.cleverapps.io/");
    const historial = await axios.get("https://app-7c7abf18-8298-4713-a5f3-1861e51324b6.cleverapps.io/movies/historial")
    this.pelicula = res.data.peliculas.filter(
      (p) => p.id_pelicula == this.$route.params.id
    )[0];
    console.log(this.pelicula.titulo);

    this.name = this.pelicula.titulo;
    this.descripcion = this.pelicula.Descripcion;
    this.trailer = this.pelicula.trailer
    this.calificacion = this.pelicula.calificacion
    this.myCalifiacion = historial.data.history.filter(u=>  u.usuarioid_usuario == this.user.id_usuario)
    if(this.myCalifiacion[0].visto=="si"){
      this.vista = true;
    }
    this.genteCalificacion = this.myCalifiacion
    this.myCalifiacion  = this.myCalifiacion[0].calififacion
    this.ratingModel = this.pelicula.calificacion;
    console.log(this.pelicula);
    if (this.$store.state.movie.nombre == "jhon") {
      window.location.href = "#/";
    }
  },
  mounted() {},
  components: {},
  watch: {
   caratula:function (){}
  },
  methods: {
    actualizar:  async function () {
    const res = await axios.get("https://app-7c7abf18-8298-4713-a5f3-1861e51324b6.cleverapps.io/");
    const historial = await axios.get("https://app-7c7abf18-8298-4713-a5f3-1861e51324b6.cleverapps.io/movies/historial")
    this.pelicula = res.data.peliculas.filter(
      (p) => p.id_pelicula == this.$route.params.id
    )[0];
    console.log(this.pelicula.titulo);

    this.name = this.pelicula.titulo;
    this.descripcion = this.pelicula.Descripcion;
    this.trailer = this.pelicula.trailer
    this.calificacion = this.pelicula.calificacion
    this.myCalifiacion = historial.data.history.filter(u=>  u.usuarioid_usuario == this.user.id_usuario)
    if(this.myCalifiacion[0].visto=="si"){
      this.vista = true;
    }
    this.genteCalificacion = this.myCalifiacion
    this.myCalifiacion  = this.myCalifiacion[0].calififacion
    this.ratingModel = this.pelicula.calificacion;
    console.log(this.pelicula);
   
  },
    momento: function (fecha) {
      return moment(fecha).fromNow();
    },
    calificar: async function () {
      const res = await axios.post("https://app-7c7abf18-8298-4713-a5f3-1861e51324b6.cleverapps.io/movies/calificar", {
        calificacion: this.myCalifiacion,
        id_usuario: JSON.parse(localStorage.getItem("usuario")).id_usuario,
        visto: "si",
        id_pelicula: this.pelicula.id_pelicula,
        promedio : this.pelicula.calificacion
      });
      if(res.data.msg == "califiacado con exito"){
         this.$q.notify({
            color: "green-5",
            textColor: "white",
            icon: "done",
            message: res.data.msg,
          });
          this.actualizar()
      }else{
         this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "algo anda mal",
          });
      }
    },
  },
});
</script>
