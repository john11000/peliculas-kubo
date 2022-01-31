<template>
  <div class="login bg-dark">
    <div
      class="q-pa-md bg-white text-black shadow-up-16 rounded-borders"
      style="width: 400px"
    >
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    
        <h6 class="text-uppercase text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
          register
        </h6>
        <q-input
          filled
          v-model.trim="name"
          label="Your username *"
          title="please, put your username to log in, minimo 4 digitos"
          lazy-rules
           pattern="[A-Za-z]{4,40}"
          :rules="[(val) => (val && val.length > 0)  || 'Please type something'
           
          ]"
          
        />

        <q-input
          filled
          type="password"
          v-model.trim="pass"
          label="Your password *"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="the password must be  sure, Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please put your password ',
          
          ]"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div class="text-center">
          <q-btn label="register" type="submit" color="primary" />
        </div>
            <q-btn @click="$router.replace(`/login`)" flat rounded color="primary" label="ya tengo una cuenta" />

      </q-form>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import auth from "src/auth/index"
import axios from "axios" 
export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const pass = ref(null);
    const accept = ref(false);

    return {
      name,
      pass,
      accept,

      onSubmit() {
        if (accept.value !== true) {


          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          

          (async () => {
            const res = await axios.post("https://app-7c7abf18-8298-4713-a5f3-1861e51324b6.cleverapps.io/users/register", {
              username: name.value,
              password: pass.value,
              rol: "c",
              randid: localStorage.getItem("randid"),
            });
            if( res.data.estado === 1){
              localStorage.setItem("token",res.data.token)
              window.location.href="#/administracion/panel"
               $q.notify({
              color: "green-4",
              textColor: "white",
              icon: "done",
              message: res.data.msg,
            });
            }else{
               $q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: res.data.msg,
            });
            }
           
          })();

          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        name.value = null;
        pass.value = null;
        accept.value = false;
      },
    };
  },  beforeCreate : function (){
    auth(this.$route.fullPath)
  }
};
</script>

<style scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
