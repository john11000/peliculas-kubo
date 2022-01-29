<template>
  <div class="q-ma-sm">
    <q-card class="my-card bg-dark" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">Overline</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ name }}</div>
          <div class="text-caption text-grey">
            {{ descripcion }}
          </div>
        </q-card-section>
    <div class="q-pa-md col-6 text-end q-ma-md ">
            <q-carousel
              animated
              v-model="slide"
              navigation
              infinite
              :autoplay="autoplay"
              arrows
              transition-prev="slide-right"
              transition-next="slide-left"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
            >
              <q-carousel-slide
                :name="1"
                
                img-src="https://cdn.quasar.dev/img/mountains.jpg"
              />
              <q-carousel-slide
                :name="2"
                img-src="https://cdn.quasar.dev/img/parallax1.jpg"
              />
              <q-carousel-slide
                :name="3"
                img-src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
              <q-carousel-slide
                :name="4"
                img-src="https://cdn.quasar.dev/img/quasar.jpg"
              />
            </q-carousel>
          </div>
       
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat> 7:30PM </q-btn>
        <q-btn flat color="primary"> Reserve </q-btn>
      </q-card-actions>
      <hr />
      <div class="q-pa-md q-mx-auto desktop-only" style="width: 50%">
        <q-video
          :ratio="16 / 9"
          src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
        />
      </div>
      <div class="q-pa-md q-mx-auto desktop-hide">
        <q-video
          :ratio="16 / 9"
          src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
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

export default defineComponent({
  name: "PageIndex",
  data() {
    return {
      pelicula: "",
      $store: useStore(),
      name: "",
      descripcion: "",
      slide: ref(1),
      autoplay: ref(true),
    };
  },
  beforeCreate: async function () {
    this.pelicula = await this.$store.state.movie.data;
    this.pelicula = this.pelicula[this.$route.params.id];
    this.name = this.pelicula.name;
    this.descripcion = this.pelicula.description;
  },
  mounted() {},
  components: {},
  methods: {
    setName: async function () {},
  },
});
</script>
