import axios from "axios";
const baseUrl = "https://app-7c7abf18-8298-4713-a5f3-1861e51324b6.cleverapps.io/";

const auth =  async(path = "", $store) => {
  if (localStorage.getItem("token")) {
      const res =  await axios.get( baseUrl + "users/",   {headers: { token :  localStorage.getItem("token")}})
    if(!localStorage.getItem("usuario")){
        localStorage.setItem("usuario",JSON.stringify(res.data.usuario) )
    }


      if(res.data.estado === 0 ) {
          localStorage.removeItem("token")
          window.location.reload()
      }
      if(res.data.usuario.rol === "c"){
        path ==="/login" || path === "/register" || path=="/" || path== "/panel"? window.location.href = "#/administracion/panel" : null
      }else{
        path ==="/login" || path === "/register" || path=="/"|| path=="/administracion/panel"  ? window.location.href = "#/panel" : null

      }


  }else{
      path == "/login" || path == "/register" || path == "/" ? null : window.location.href = "#/login"

  }

};

export default  auth;
