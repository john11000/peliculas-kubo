<template >
  <q-item
  
    clickable
    tag="a"
    target="_self"
    :href="id_categoria === 1 ? `#/`:`#/categoria/`+id_categoria"
  >
    <q-item-section
    
      avatar
    >
      <q-icon name="slideshow" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ nombre_categoria }}</q-item-label>
      <q-item-label caption>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    nombre_categoria: {
      type: String,
      required: true
    },


    id_categoria: {
      default: '#'
    }
  }
})
</script>
