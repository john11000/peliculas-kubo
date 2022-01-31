<template>
  <router-view class='bg-grey-8 text-white' />
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  updated(){
    console.log(window.location.pathname)
  }
})
</script>
