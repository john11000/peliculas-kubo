<template>
  <div class=" row items-start ">
      <q-tooltip anchor="top middle" class="bg-dark text-body2 "  style="height:220px; overflow:hidden; border:1px solid #fff;" self="bottom middle" :offset="[10, 10]">
           {{ prop.description }}
        </q-tooltip>
    <q-card class="my-card q-ma-sm bg-dark text-white ">

           <q-video src="https://www.youtube.com/embed/DJUG9GirEWc" />
      <!-- <q-img :src="prop.img" :ratio="4 / 3" width="20" loading="lazy" /> -->

       <q-card-section style="height:150px; overflow:hidden;">
        <div class="" style="heigth: 50px;overflow:hidden;">{{prop.name.substring(0,25)}}</div>
        <div class="text-subtitle2">by John Doe</div>
           <div class="text-overline text-h1 text-positive">new </div>
        <ratingVue :val='4' />
        <div class="text-h6 q-mt-sm q-mb-xs" ></div>

        <div class="text-caption text-grey">
       <!-- {{ prop.description }} -->

        </div>
      </q-card-section>
    

   
    </q-card>
  </div>
</template>
<script>
import { ref } from "vue";
import ratingVue from './rating.vue';
export default {
  methods :{

  },
  setup() {
    return {
      expanded: ref(false),
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  props: ["prop"],
  components:{
      ratingVue,
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
