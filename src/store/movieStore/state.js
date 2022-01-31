import axios from "axios";


export default function () {
  
  return {
    nombre: localStorage.getItem("token") ? localStorage.getItem("usuario") : null,
    token : localStorage.getItem("token") ? localStorage.getItem("token") : null,
    data: (async()=>{
        const res = await axios.get("https://app-7c7abf18-8298-4713-a5f3-1861e51324b6.cleverapps.io/");
        return res.data;
    })()
  }
}
