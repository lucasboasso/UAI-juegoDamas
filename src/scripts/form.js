window.onload = function(){
    var formulario = document.getElementById("formulario");
    var nombre = document.getElementById("nombre");
    var email = document.getElementById("email");
    var comentarios = document.getElementById("comentarios");
    var mailContacto = "contacto@minidamas.com"

formulario.addEventListener('submit', function submit(e){
    e.preventDefault();
    if(comprobaciones() === true){
        document.location = "mailto:"+mailContacto+"&body="+comentarios+""
        completado();
        };
    });

function completado(){
    nombre.value="";
    nombre.classList.remove("esValido");
    email.value="";
    email.classList.remove("esValido");
    comentarios.value="";
    comentarios.classList.remove("esValido");
    alert("Formulario enviado");
};

function comprobaciones(){
    var valorNombre = nombre.value;
    var valorEmail = email.value;
    var valorComentarios = comentarios.value;

    if(valorNombre === "") {
        nombre.classList.add("esInvalido");
        alert("Debe ingresar un nombre");
    }
    else{
        nombre.classList.add("esValido");
        nombre.classList.remove("esInvalido");
    }
    if(valorEmail === "") {
        email.classList.add("esInvalido");
    }
    else{
        email.classList.add("esValido");
        email.classList.remove("esInvalido");
    }
    if(!isEmail(valorEmail)) {
        email.classList.add("esInvalido");
        alert("Debe ingresar un mail valido");
    }
    else{
        email.classList.remove("esInvalido");
        email.classList.add("esValido");
    }
    if(valorComentarios === "" || valorComentarios.length < 5) {
        comentarios.classList.add("esInvalido");
        alert("Debe contener mas de 5 caracteres");
    }
    else{
        comentarios.classList.add("esValido");
        comentarios.classList.remove("esInvalido");
    };
    var invalidos = document.getElementsByClassName('esInvalido');
    let esValido = (invalidos.length === 0);
    if(!esValido){
        invalidos[0].focus();
    };
    return esValido;
}

function isEmail(email){
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
}