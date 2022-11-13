//saco del localStorage el item seleccionado por el usuario
let carrito = JSON.parse(localStorage.getItem("lentes")) || [];
const select = document.getElementById("cantidadAComprar");
let divConImg = ``;

//creo una seccion con el producto traido de index, que fue seleccionado por el usuario
const renderizarProductos = () => {
	const contenedor = document.getElementById("artElegido");
	contenedor.innerHTML = "";

	carrito.forEach((id) => {
		const producto = lentesDisponibles.find(
			(producto) => producto.id === parseInt(id),
		);
		divConImg = document.createElement("div")
			divConImg.innerHTML = `
				<div class="seleccionado">
					<div class="txt-login col-10"><p>Descripción del producto seleccionado: ${producto.nombre} , ${producto.marca}</p></div>
					<div class="txt-login col-10"><p>Precio por unidad: $ ${producto.precio}</p></div>
				</div>
			`
			document.getElementById("artElegido").append(divConImg);
	});
};


renderizarProductos();

//según la cantidad deseada a comprar, le da el valor a pagar, sacando del localStorage el producto seleccionado
//para multiplicar por el precio y actualiza el stock. 
const cantidadAComprar = document.getElementById(`cantidadAComprar`)
cantidadAComprar.addEventListener("click", (e) => {
	e.preventDefault();
	const valor = parseInt(select.options[select.selectedIndex].value);
	const productosGuardados = JSON.parse(localStorage.getItem("lentesDisponibles"));
	carrito.forEach((id) => {
		const armazon = productosGuardados.find(
			(armazon) => armazon.id === parseInt(id),
		);
		armazon.stock -= valor;
		if (valor === 1){
            Swal.fire (`El total a abonar es de $ ` + armazon.precio);
        } else if(valor === 2){
            let priceTotal = armazon.precio * 2;
			Swal.fire (`El total a abonar es de $ ` + priceTotal);
        } else if (valor === 3){
            let priceTotal2 = armazon.precio * 3;
			Swal.fire (`El total a abonar es de $ ` + priceTotal2);
        };
	});
	localStorage.setItem("lentesDisponibles", JSON.stringify(productosGuardados));
});

//tomo boton enviar para validar el formulario
const finalizar = document.getElementById(`boton-finish`)
finalizar.addEventListener(`click`, (e) => {
	e.preventDefault();
//validación formulario de compra
const nombre = document.getElementById("user");
const ncredit = document.getElementById("ncredit");
const code = document.getElementById("code");
const adress = document.getElementById("adress");
const localidad = document.getElementById("localidad");
const province = document.getElementById("province");
const email = document.getElementById("email");
const tel = document.getElementById("tel");

validarTarjeta(ncredit);
validarName(nombre);
validarName(adress);
validarName(localidad);
validarName(province);
validarTelefono(tel);
validarName(email);
validarCodSeg(code);


});

//cada una de estas funciones valida el formulario
function validarCodSeg(code){
	if(code.value.length !=3) {
		code.style.border= "2px solid red";
	}else {
		code.style.border = "inherit";
	}
}
function validarTelefono(telef){
	if(telef.value.length != 10) {
		telef.style.border= "2px solid red";
	}else {
		telef.style.border = "inherit";
	}
}
function validarTarjeta(credit){
	if(credit.value.length != 16) {
		credit.style.border= "2px solid red";
	}else {
		credit.style.border = "inherit";
	}
}
function validarName(aValidar){
if(aValidar.value.length < 6){
	aValidar.style.border = "2px solid red";
}else {
	aValidar.style.border = "inherit";
}
}


//funcion para vaciar carrito y local Storage, con el botón eliminar producto y el de finalizar compra 
let clearCarrito = document.getElementById(`boton-close`);
    clearCarrito.addEventListener(`click`, clearHTML);
let finalizarCompraVaciado = document.getElementById(`finalizar`);
	finalizarCompraVaciado.addEventListener(`click`, finalizacionCompra);

function clearHTML(){
    const eliminarlentes = localStorage.removeItem(`lentes`);
	const eliminarArrayProd = localStorage.removeItem(`lentesDisponibles`);
    divConImg.innerHTML = ``; 
	carrito = []; 
	mensajeVaciadoCarrito();
}
function mensajeVaciadoCarrito(){
	Swal.fire('El carrito se encuentra vacío');
}

function finalizacionCompra(){
	if (carrito != ``){
	Swal.fire({
		icon: 'success',
		title: '¡Gracias por su compra!',
		showConfirmButton: false,
		timer: 2500
	})
	const eliminarlentes = localStorage.removeItem(`lentes`);
	const eliminarArrayProd = localStorage.removeItem(`lentesDisponibles`);
    divConImg.innerHTML = ``; 
	carrito = []; 
} else{
	Swal.fire({
		icon: 'error',
		title: 'El carrito se encuentra vacío, seleccione un producto',
		showConfirmButton: false,
		timer: 2500
	})
}	
}