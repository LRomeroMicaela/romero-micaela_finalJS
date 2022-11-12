//array que corresponde al articulo seleccionado por el cliente.
const arrayProductos = [];
console.log(arrayProductos);
lentesDisponibles = JSON.parse(localStorage.getItem("lentesDisponibles")) || [];
console.log (lentesDisponibles);

//API del tiempo
tiempoAPI();

//funcion que inicia para borrar todo lo almacenado desde un ppio
function clear(){
      const eliminarlentes = localStorage.removeItem(`lentes`);
      const eliminarArrayProd = localStorage.removeItem(`lentesDisponibles`);
}

armadoCard();
//funcion para armar las card por JS
function armadoCard() {
	for (let armazon of lentesDisponibles) {
		let card = document.createElement("div");
		card.innerHTML += `
            <div class="card-body">
            <img src = ${armazon.img} class="card-img-top" alt = ${armazon.nombre}>
              <h5 class="card-title txt-login">${armazon.nombre}, ${armazon.marca}</h5>
              <div class="txt-login cont-price ">
              <h6 class="txt">$</h6>
              <h6 class="card-txt price">${armazon.precio}</h6>
              </div>
              <a id="btn-add" data-id='${armazon.id}' href="#" class="btn btn-primary subm1">Agregar al carrito</a>
            </div>`;
		document.getElementById("container-productos").append(card);
		card.className = "card col-10 col-md-3 img-cat main-img";
	}
}

//variable que selecciona todos los botones de las card
const addButtons = document.querySelectorAll(`#btn-add`);

//funcion, creo el evento del click del boton y llamo a la funcion traer la card seleccionada por el usuario
addButtons.forEach((button) => {
button.addEventListener(`click`, addToCartClicked);
});

//funcion que pushea al carrito el id del producto seleccionado a través del botón, después guarda en el
//localStorage ese array para poder usarlo en carrito.js
function addToCartClicked(event) {
const boton = event.target;
arrayProductos.push(boton.dataset.id);
localStorage.setItem("lentes", JSON.stringify(arrayProductos));
mensaje();
}

function mensaje(){
      Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto añadido al carrito correctamente',
            showConfirmButton: false,
            timer: 1500
      })
}

// funcion que trae un API con el clima
function tiempoAPI(){
      const tiempo="https://api.openweathermap.org/data/2.5/weather?lat=-34.61315&lon=-58.4370894&appid=d05820224a9b59af39854d2b614d913d";
      fetch(tiempo)
          .then( respuesta => respuesta.json())
          .then( data => {
              console.log(data);
              const {name, main:{temp, temp_min, temp_max}, weather:[arr] } = data;
              console.log(name);
              console.log(temp);
              console.log(temp_max);
              console.log(temp_min);
              console.log(arr.icon);
              
              const grados = kelvinACentigrados(temp);
              const gradosMin = kelvinACentigrados(temp_min);
              const gradosMax = kelvinACentigrados(temp_max);

              document.getElementById("tiempo").innerHTML+=`
              <div><p> Ciudad: ${name} </p></div>
              <div><p> Temperatura: ${grados} °C </p></div>
              <div><p> T° máxima: ${gradosMax} °C </p></div>
              <div><p> T° mínima: ${gradosMin} °C </p></div>
              <div><img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon"></img></div>

              `;
              
         })
   }
  
   function kelvinACentigrados(temp){
      return parseInt(temp - 273.15);
   }

// // funcion que trae la card y extraigo los items de la card que me sirven. Llamo a otra funcion para armar el carrito
// //guarda en el localStorage el prod seleccionado para pasarlo luego a la hoja carrito
// function addToCartClicked(event){
//     const boton = event.target;
//     const traerCardEntera = boton.closest(`.card`);

//     const cardTitle = traerCardEntera.querySelector(`.card-title`).textContent;
//     const cardPrecio = traerCardEntera.querySelector(`.card-txt`).textContent;
//     const cardImg = traerCardEntera.querySelector(`.card-img-top`).src;

//     arrayProductos.push({cardTitle, cardPrecio, cardImg})
//     console.log(arrayProductos)

//     localStorage.setItem('lentes', JSON.stringify(arrayProductos))
// };


// //me llevo del array a la hoja carrito, el id y stock para restar en la compra
// datosDeStock=[];
// function restarAlStock(idProd, stockDispo){
//   datosDeStock.push({idProd,stockDispo});
//   console.log(datosDeStock);
//   localStorage.setItem(`stockId`, JSON.stringify(datosDeStock)); 
//   extraerStock(); 
// };

// //saco id y stock actualizado del localStorage, esto vino del carrito.js
// let actualizacionDelStock = JSON.parse(localStorage.getItem("stockActualizado"));
// const stockAct = [];
// function extraerStock(){
//         for (let item of actualizacionDelStock) {
//             let { idProd, cantidad } = item;
//             console.log(item);
//             almacenarArrayIdYStockAct(idProd, cantidad);
//             //break;
//         }
// }

// //funcion para adherir al carrito lo sacado del localStorage que viene de la hoja carrito.js, cantidad a comprar y ID
// function almacenarArrayIdYStockAct(id, cantDeseada){
//     stockAct.push({id, cantDeseada});
//     console.log (stockAct);
//     restarAlStockLaCantVendida();
// }

// function restarAlStockLaCantVendida(){
//     for (let id of stockAct){
//         if (id == lentesDisponibles.id){
//             let {value} = cantidad 
//             let restarAlStock = Lentes.stock - value ;
//             console.log(restarAlStock);
//             return restarAlStock; 
//         }
//     }
// }

// //funcion para actualizar el stock del armazón elegido
// function actualizarStockDelArray(){
//     for (let id of stockAct){
//         if (id == lentesDisponibles.id){
//             this.stock = stockDispo;
//         }
//     }
 //     }
