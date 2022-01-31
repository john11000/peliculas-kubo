<template>
    <div class="bg-dark">asa{{ token }}</div>
    
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
    data (){
        return {
            token:localStorage.getItem("token"),
            $store:useStore()
        }

    },
    beforeCreate(){
    }
})
</script>
