var formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const comentarios = document.getElementById("comentarios");

console.log(formulario);

formulario.addEventListener('submit', e => {
    e.preventDefault();
    comprobaciones();
    completado();
});

function completado() {
    nombre.value="";
    nombre.classList.remove("is-valid");
    email.value="";
    email.classList.remove("is-valid");
    comentarios.value="";
    comentarios.classList.remove("is-valid");
    alert("Formulario enviado");
}

function comprobaciones(){
    const valorNombre = nombre.value;
    const valorEmail = email.value;
    const valorComentarios = comentarios.value;
    if(valorNombre === "") {
        alert("Debe ingresar nombre");
        nombre.focus();
        nombre.classList.add("is-invalid");
    }
    else{
        nombre.classList.add("is-valid");
        nombre.classList.remove("is-invalid");
    }
    if(valorEmail === "") {
        email.focus();
        email.classList.add("is-invalid");
        
    }
    else{
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
    }
    if(!isEmail(valorEmail)) {
        email.focus();
        email.classList.add("is-invalid")
    }
    else{
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }
    if(valorComentarios === "") {
        comentarios.focus();
        comentarios.classList.add("is-invalid");
    }
    else{
        comentarios.classList.add("is-valid");
        comentarios.classList.remove("is-invalid");
    }
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}