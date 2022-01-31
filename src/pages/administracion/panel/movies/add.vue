<template>
  <div class="q-pa-md">
    <q-stepper
      v-model="step"
      ref="stepper"
      dark
      class="bg-grey-10"
      active-color="deep-orange"
      done-color="positive"
      animated
    >
      <q-step
        :name="1"
        title="datos sobre la pelicula"
        icon="settings"
        :done="step > 1"
      >
        <div class="q-ma-md q-gutter-sm text-dark">
          <p class="text-center text-white">Nombre</p>

          <q-input
            filled
            v-model="nombreMovie"
            class="bg-white"
            label="Nombre de la pelicula"
            :dense="dense"
          />
          <p class="text-center text-white">Descripción</p>

          <q-editor
            v-model="qeditor"
            :dense="$q.screen.lt.md"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['left', 'center', 'right', 'justify'],
                },
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  options: ['left', 'center', 'right', 'justify'],
                },
              ],
              [
                'bold',
                'italic',
                'strike',
                'underline',
                'subscript',
                'superscript',
              ],
              ['token', 'hr', 'link', 'custom_btn'],
              ['print', 'fullscreen'],
              [
                {
                  label: $q.lang.editor.formatting,
                  icon: $q.iconSet.editor.formatting,
                  list: 'no-icons',
                  options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                },
                {
                  label: $q.lang.editor.fontSize,
                  icon: $q.iconSet.editor.fontSize,
                  fixedLabel: true,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'size-1',
                    'size-2',
                    'size-3',
                    'size-4',
                    'size-5',
                    'size-6',
                    'size-7',
                  ],
                },
                {
                  label: $q.lang.editor.defaultFont,
                  icon: $q.iconSet.editor.font,
                  fixedIcon: true,
                  list: 'no-icons',
                  options: [
                    'default_font',
                    'arial',
                    'arial_black',
                    'comic_sans',
                    'courier_new',
                    'impact',
                    'lucida_grande',
                    'times_new_roman',
                    'verdana',
                  ],
                },
                'removeFormat',
              ],
              ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

              ['undo', 'redo'],
              ['viewsource'],
            ]"
            :fonts="{
              arial: 'Arial',
              arial_black: 'Arial Black',
              comic_sans: 'Comic Sans MS',
              courier_new: 'Courier New',
              impact: 'Impact',
              lucida_grande: 'Lucida Grande',
              times_new_roman: 'Times New Roman',
              verdana: 'Verdana',
            }"
          />

          <p class="text-center text-white">Duraccion de la pelicula</p>
          <q-input
            filled
            v-model="timeWithSeconds"
            class="bg-white text-center col-6 q-ma-sm"
            mask="fulltime"
            :rules="['fulltime']"
            style="width: 250px; margin: auto"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="timeWithSeconds" with-seconds format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <p class="text-center text-white">Categorias</p>

          <q-select
            filled
            v-model="categorias"
            multiple
            class="bg-white"
            :options="options"
            counter
            hint="categorias"
            style="width: 250px; margin: auto"
          />
        </div>
      </q-step>

      <q-step
        :name="2"
        title="imagenes y trailers"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
      >
        <p class="text-center text-white">Portada de la pelicula</p>
        
        <q-file
          class="bg-white q-ma-auto"
          v-model="filesImages"
          filled
          label="solo imagenes"
          multiple
          accept=".jpg, image/*"
          @rejected="onRejected"
        />
        <p class="text-center text-white q-my-sm">
          seleciona una url de un video en youtube para trailer de la pelicula
        </p>

        <q-input
          outlined
          class="bg-white q-mt-sm"
          v-model="trailerMovie"
          label="youtube video url"
        />
      </q-step>

      <q-step
        :name="3"
        title="fecha de estreno"
        class="text-center q-ma-auto"
        icon="add_comment"
      >
        <p class="text-center text-white q-my-sm">
          seleciona una fecha de estreno la pelicula
        </p>

        <q-date v-model="estrenoMovie" dark bordered />

        <p>
          El ultimo paso para crear la pelicula. por favor verifique que todos
          los campos esten correctos.
        </p>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="step === 3"
            color="positive"
            @click="enviar()"
            label="Finish"
            class="q-ml-sm"
          />
          <q-btn
            @click="$refs.stepper.next()"
            color="deep-orange"
            :label="step === 3 ? 'Finish' : 'Continue'"
            v-if="step < 3"
          />
          <q-btn
            v-if="step > 1"
            flat
            color="deep-orange"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useQuasar } from 'quasar';
export default {
  setup() {
    return {
         $q : useQuasar(),
      step: ref(1),
      nombreMovie: ref(""),
      trailerMovie: ref(""),
      ph: ref(""),
      dense: ref(false),
      estrenoMovie: ref(""),
      date: ref("2019/02/01"),
      qeditor: ref("Descripcion de la pelicula"),
      timeWithSeconds: ref("00:00:00"),
      categorias: ref(null),
      model2: ref(null),
      filesImages: ref(null),
      options: [],
      onRejected(rejectedEntries) {
        $q.notify({
          type: "negative",
          message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
        });
      },
    };
  },
  methods: {
    enviar: async function () {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const data = new FormData();
      data.append("caratula",this.filesImages[0] )
      data.append("titulo",this.nombreMovie )
      data.append("descripcion",this.qeditor )
      data.append("fecha_estreno",this.estrenoMovie )
      data.append("duracion",this.timeWithSeconds )
      data.append("categorias",this.categorias )
      data.append("trailer",this.trailerMovie )

      const res = await axios.post("https://app-7c7abf18-8298-4713-a5f3-1861e51324b6.cleverapps.io/movies/subir", data);
      console.log(res);
      if(res.data.estado != 1){
        this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: res.data.msg,
          });
      }else{
             this.$q.notify({
            color: "green-5",
            textColor: "white",
            icon: "positive",
            message: res.data.msg,
          });
          this.$router.replace("/administracion/panel");

     
      }

      console.log(
        this.nombreMovie,
        this.trailerMovie,
        this.estrenoMovie,
        this.qeditor,
        this.filesImages[0],
        this.categorias,
        this.timeWithSeconds
      );
    },
  },
  beforeCreate: async function () {
    const res = await axios.get("https://app-7c7abf18-8298-4713-a5f3-1861e51324b6.cleverapps.io/movies/categorias");
    console.log(res.data.categorias);
    this.options = res.data.categorias.map(
      (categoria) => categoria.id_categoria +" "+categoria.nombre_categoria 
    );
    console.log(this.options);
  },
};
</script>
