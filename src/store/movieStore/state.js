import axios from "axios";


export default function () {
  
  return {
    nombre : "jhon anderson",
    data: (async()=>{
        const res = await axios.get("api/productos.json");
        return res.data.productosTotal;
    })()
  }
}
