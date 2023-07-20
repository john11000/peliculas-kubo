import axios from "axios";


export default function () {
  
  return {
    nombre: localStorage.getItem("token") ? localStorage.getItem("usuario") : null,
    token : localStorage.getItem("token") ? localStorage.getItem("token") : null,
    data: (async()=>{
        const res = await axios.get("https://ej101.azurewebsites.net/");
        return res.data;
    })()
  }
}
