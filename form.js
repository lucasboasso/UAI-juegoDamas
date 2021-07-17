var formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const comentarios = document.getElementById("comentarios");


formulario.addEventListener('submit', e => {
    e.preventDefault();
    if(comprobaciones() === true){
        var form = new FormData(formulario)
        const datos = {
        nombre: form.get('nombre'),
        email: form.get('email'),
        comentarios: form.get('comentarios')
        }
        postData('https://jsonplaceholder.typicode.com/posts', datos)
        .then(data => {
        console.log(data);
        })
        completado();
    }
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
        nombre.classList.add("is-invalid");
    }
    else{
        nombre.classList.add("is-valid");
        nombre.classList.remove("is-invalid");
    }
    if(valorEmail === "") {
        email.classList.add("is-invalid");
    }
    else{
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
    }
    if(!isEmail(valorEmail)) {
        email.classList.add("is-invalid")
    }
    else{
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
    }
    if(valorComentarios === "") {
        comentarios.classList.add("is-invalid");
    }
    else{
        comentarios.classList.add("is-valid");
        comentarios.classList.remove("is-invalid");
    }
    const invalidos = document.getElementsByClassName('is-invalid');
    let esValido = (invalidos.length == 0)
    if(!esValido){
        invalidos[0].focus();
    }
    return esValido;
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

async function postData(url, data) {
const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
    'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
});
return response.json();
}