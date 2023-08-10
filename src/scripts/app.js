    /*
    0 = Cuadrado Blanco Vacio
    1 = Cuadrado Negro Vacio
    2 = Cuadrado Negro con Ficha Blanca
    3 = Cuadrado Negro con Ficha Roja
    */
window.onload = function(){
    var tablero = document.getElementById("tablero");
    var btnNuevaPartida = document.getElementById("nuevaPartida");
    var btnGuardarPartida = document.getElementById("guardarPartida");
    var btnCargarPartida = document.getElementById("cargarPartida");
    var modalCerrar = document.getElementById("closeModalPlayer");
    var modalCartelCerrar = document.getElementById("cerrarModalGanador");
    var modalGuardar = document.getElementById("guardNomb");
    var modalNuePart = document.getElementById("modalJugadores");
    var modalCartel = document.getElementById("modalCartel");
    var modalPuntaje = document.getElementById("modalPuntaje");
    var modalPuntajeCerrar = document.getElementById("cerrarModalPuntaje");
    var ganador = document.getElementById("ganador");
    var linkTablero = document.getElementById("linkTablero");
    var tbodyModalPuntaje = document.getElementById("tbodyModalPuntaje");
    var sortFecha = document.getElementById("sortFecha");
    var sortPuntajeJug1 = document.getElementById("sortPuntajeJug1");
    var sortPuntajeJug2 = document.getElementById("sortPuntajeJug2");

    btnNuevaPartida.addEventListener("click", nuevaPartida);
    btnGuardarPartida.addEventListener("click", guardarPartida);
    btnCargarPartida.addEventListener("click", cargarPartida);

    modalCerrar.addEventListener("click", cerrarModal);
    modalCartelCerrar.addEventListener("click", cerrarModalCartel);
    modalGuardar.addEventListener("click", guardNombre);
    modalPuntajeCerrar.addEventListener("click", cerrarModalPuntaje)

    linkTablero.addEventListener("click", abrirModalPuntaje);
    sortFecha.addEventListener("click", ordenarFecha);
    sortPuntajeJug1.addEventListener("click", ordenarPuntajeJug1);
    sortPuntajeJug2.addEventListener("click", ordenarPuntajeJug2);

    var nomJug1 = "Jugador 1";
    var nomJug2 = "Jugador 2";
    var turno = "rojas";
    var ptsBlanco = 0;
    var ptsRojo = 0;
    var fechaMayor = false;
    var puntajeMayorJug1 = false;
    var puntajeMayorJug2 = false;

    var cartelTurno = document.getElementById("turno");
    var cartelPtsJug1 = document.getElementById("ptsJug1");
    var cartelPtsJug2 = document.getElementById("ptsJug2");
    var nombreJug1 = document.getElementById("nomJug1");
    var nombreJug2 = document.getElementById("nomJug2");

    var estadoJuego = [
        [0,2,0,2,0,2,0,2],
        [2,0,2,0,2,0,2,0],
        [0,2,0,2,0,2,0,2],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [3,0,3,0,3,0,3,0],
        [0,3,0,3,0,3,0,3],
        [3,0,3,0,3,0,3,0]
    ];

    function imprimirTablero(){
        estadoJuego.forEach(function(row, j){
            var fila = document.createElement('div');
            row.forEach(function(cell, i){
                var celda = document.createElement('div');
                celda.setAttribute("fila", j);
                celda.setAttribute("columna", i);
                switch(cell){
                    case 0:
                        celda.classList.add("cuadradoBlanco");
                        break;
                    case 1:
                        celda.classList.add("cuadradoNegro");
                        break;
                    case 2:
                        celda.classList.add("cuadradoNegro", "fichaBlanca");
                        break;
                    case 3:
                        celda.classList.add("cuadradoNegro", "fichaRoja");
                        break;
                };
                fila.appendChild(celda);
            });
            tablero.appendChild(fila);
        });
    };

    function imprimirCartel(){
        cartelTurno.innerHTML = `Turno Fichas ${turno.charAt(0).toUpperCase()}${turno.slice(1)}`;
        cartelPtsJug1.innerHTML = ptsBlanco;
        cartelPtsJug2.innerHTML = ptsRojo;
        nombreJug1.innerHTML = nomJug1;
        nombreJug2.innerHTML = nomJug2;
    };

    function cambioJugador(){
        ganoPartida();
        if(turno === "rojas"){
            turno = "blancas";
        }
        else{
            turno = "rojas";
        }
        imprimirCartel();
    };

    function tableroClick(clickedCellEvent){
        var seleccionado = document.getElementsByClassName('seleccionado');
        var clickedCell = clickedCellEvent.target;
        var fichaRoja = clickedCell.classList.contains('fichaRoja');
        var fichaBlanca = clickedCell.classList.contains('fichaBlanca');
        var fichaRojaDama = clickedCell.classList.contains('fichaRojaDama');
        var fichaBlancaDama = clickedCell.classList.contains('fichaBlancaDama');
        if(hayFichaSeleccionada(clickedCellEvent) && (fichaRoja || fichaBlanca || fichaBlancaDama || fichaRojaDama) === false){
            moverFicha(clickedCellEvent, seleccionado);
        }
        else if(hayFichaSeleccionada(clickedCell) && (fichaRoja || fichaBlanca || fichaBlancaDama || fichaRojaDama)){
            seleccionado[0].classList.remove('seleccionado');
            selecFicha(clickedCellEvent, fichaRoja, fichaBlanca, fichaRojaDama, fichaBlancaDama);
        }
        else{
            selecFicha(clickedCellEvent, fichaRoja, fichaBlanca, fichaRojaDama, fichaBlancaDama);
        }
    };

    function esDama(turno, filaDestino, clickedCell){
        if (filaDestino === 0 && turno === "rojas"){
            clickedCell.classList.remove('fichaRoja');
            clickedCell.classList.add('fichaRojaDama');
        }
        else if(filaDestino === 7 && turno === "blancas"){
            clickedCell.classList.remove('fichaBlanca');
            clickedCell.classList.add('fichaBlancaDama');
        }
    };

    function ganoPartida(){
        if(ptsBlanco === 12){
            modalCartel.style.display = "block";
            ganador.innerHTML = `Ganador ${nomJug1}`
            tablero.removeEventListener("click", tableroClick);
            guardarPuntaje();
        }
        else if(ptsRojo === 12){
            modalCartel.style.display = "block";
            ganador.innerHTML = `Ganador ${nomJug2}`
            tablero.removeEventListener("click", tableroClick);
            guardarPuntaje();
        }
    };

    function guardarPuntaje(){
        let puntaje = {
            fecha: new Date().toLocaleString(),
            nomJug1: nomJug1,
            nomJug2: nomJug2,
            ptsBlanco: ptsBlanco,
            ptsRojo: ptsRojo
        };

        let tablaPuntaje = [];

        if(cargarPuntaje())
            tablaPuntaje = cargarPuntaje();

        tablaPuntaje.push(puntaje);

        localStorage.setItem("partidas", JSON.stringify(tablaPuntaje));
    }

    function cargarPuntaje(){
        return JSON.parse(localStorage.getItem("partidas"))
    }

    function moverFichaDama(filaDestino, columnaDestino, seleccionado, filaInicial, columnaInicial, clickedCell){
        if(turno === "rojas"){
            if((filaDestino === filaInicial - 1 || filaDestino === filaInicial + 1) && (columnaDestino === columnaInicial - 1 || columnaDestino === columnaInicial + 1)){
                clickedCell.classList.add('fichaRojaDama');
                seleccionado[0].classList.remove('fichaRojaDama', 'seleccionado');
                cambioJugador();
            }
            else if((filaDestino === filaInicial - 2 || filaDestino === filaInicial + 2) && (columnaDestino === columnaInicial - 2 || columnaDestino === columnaInicial + 2)){

                if((columnaDestino === columnaInicial - 2)){
                    var columnaFichaVictima = columnaInicial - 1;
                }
                else{
                    var columnaFichaVictima = columnaInicial + 1;
                }
                if(filaDestino === filaInicial - 2){
                    var filaFichaVictima = filaInicial - 1;
                }
                else{
                    var filaFichaVictima = filaInicial + 1;
                }
                var fichaVictima = document.querySelector(`div[fila="${filaFichaVictima}"][columna="${columnaFichaVictima}"]`);
                if(fichaVictima.classList.contains("fichaBlanca")){
                    clickedCell.classList.add('fichaRojaDama');
                    fichaVictima.classList.remove("fichaBlanca");
                    seleccionado[0].classList.remove('fichaRojaDama', 'seleccionado');
                    ptsRojo++;
                    cambioJugador();
                }
                else if(fichaVictima.classList.contains("fichaBlancaDama")){
                    clickedCell.classList.add('fichaRojaDama');
                    fichaVictima.classList.remove("fichaBlancaDama");
                    seleccionado[0].classList.remove('fichaRojaDama', 'seleccionado');
                    ptsRojo++;
                    cambioJugador();
                }
            }
        }
        else if(turno === "blancas"){
            if((filaDestino === filaInicial + 1 || filaDestino === filaInicial - 1) && (columnaDestino === columnaInicial - 1 || columnaDestino === columnaInicial + 1)){
                clickedCell.classList.add('fichaBlancaDama');
                seleccionado[0].classList.remove('fichaBlancaDama', 'seleccionado');
                cambioJugador();
            }
            else if((filaDestino === filaInicial + 2 || filaDestino === filaInicial - 2) && (columnaDestino === columnaInicial - 2 || columnaDestino === columnaInicial + 2)){
                if((columnaDestino === columnaInicial - 2)){
                    var columnaFichaVictima = columnaInicial - 1;
                }
                else{
                    var columnaFichaVictima = columnaInicial + 1;
                }
                if((filaDestino === filaInicial - 2)){
                    var filaFichaVictima = filaInicial - 1;
                }
                else{
                    var filaFichaVictima = filaInicial + 1;
                }
                var fichaVictima = document.querySelector(`div[fila="${filaFichaVictima}"][columna="${columnaFichaVictima}"]`);
                if(fichaVictima.classList.contains("fichaRoja")){
                    clickedCell.classList.add('fichaBlancaDama');
                    fichaVictima.classList.remove("fichaRoja");
                    seleccionado[0].classList.remove('fichaBlancaDama', 'seleccionado');
                    ptsBlanco++;
                    cambioJugador();
                }
                else if(fichaVictima.classList.contains("fichaRojaDama")){
                    clickedCell.classList.add('fichaBlancaDama');
                    fichaVictima.classList.remove("fichaRojaDama");
                    seleccionado[0].classList.remove('fichaBlancaDama', 'seleccionado');
                    ptsBlanco++;
                    cambioJugador();
                }
            }
        }
    }

    function moverFichaComun(filaDestino, columnaDestino, seleccionado, filaInicial, columnaInicial, clickedCell){
        if(turno === "rojas"){
            if((filaDestino === filaInicial - 1) && (columnaDestino === columnaInicial - 1 || columnaDestino === columnaInicial + 1)){
                clickedCell.classList.add('fichaRoja');
                seleccionado[0].classList.remove('fichaRoja', 'seleccionado');
                esDama(turno, filaDestino, clickedCell);
                cambioJugador();
            }
            else if((filaDestino === filaInicial - 2) && (columnaDestino === columnaInicial - 2 || columnaDestino === columnaInicial + 2)){
                if((columnaDestino === columnaInicial - 2)){
                    var columnaFichaVictima = columnaInicial - 1;
                }
                else{
                    var columnaFichaVictima = columnaInicial + 1;
                }
                var fichaVictima = document.querySelector(`div[fila="${filaInicial - 1}"][columna="${columnaFichaVictima}"]`);
                if(fichaVictima.classList.contains("fichaBlanca")){
                    clickedCell.classList.add('fichaRoja');
                    fichaVictima.classList.remove("fichaBlanca");
                    seleccionado[0].classList.remove('fichaRoja', 'seleccionado');
                    ptsRojo++;
                    cambioJugador();
                }
                else if(fichaVictima.classList.contains("fichaBlancaDama")){
                    clickedCell.classList.add('fichaRoja');
                    fichaVictima.classList.remove("fichaBlancaDama");
                    seleccionado[0].classList.remove('fichaRoja', 'seleccionado');
                    ptsRojo++;
                    cambioJugador();
                }
            }
        }
        else if(turno === "blancas"){
            if((filaDestino === filaInicial + 1) && (columnaDestino === columnaInicial - 1 || columnaDestino === columnaInicial + 1)){
                clickedCell.classList.add('fichaBlanca');
                seleccionado[0].classList.remove('fichaBlanca', 'seleccionado');
                esDama(turno, filaDestino, clickedCell);
                cambioJugador();
            }
            else if((filaDestino === filaInicial + 2) && (columnaDestino === columnaInicial - 2 || columnaDestino === columnaInicial + 2)){
                if((columnaDestino === columnaInicial - 2)){
                    var columnaFichaVictima = columnaInicial - 1;
                }
                else{
                    var columnaFichaVictima = columnaInicial + 1;
                }
                var fichaVictima = document.querySelector(`div[fila="${filaInicial + 1}"][columna="${columnaFichaVictima}"]`);
                if(fichaVictima.classList.contains("fichaRoja")){
                    clickedCell.classList.add('fichaBlanca');
                    fichaVictima.classList.remove("fichaRoja");
                    seleccionado[0].classList.remove('fichaBlanca', 'seleccionado');
                    ptsBlanco++;
                    cambioJugador();
                }
                else if(fichaVictima.classList.contains("fichaRojaDama")){
                    clickedCell.classList.add('fichaBlanca');
                    fichaVictima.classList.remove("fichaRojaDama");
                    seleccionado[0].classList.remove('fichaBlanca', 'seleccionado');
                    ptsBlanco++;
                    cambioJugador();
                }
            }
        }
    }

    function moverFicha(clickedCellEvent, seleccionado){
        var clickedCell = clickedCellEvent.target;
        var filaDestino = parseInt(clickedCell.getAttribute("fila"));
        var columnaDestino = parseInt(clickedCell.getAttribute("columna"));
        var seleccionado = document.getElementsByClassName('seleccionado');
        var filaInicial = parseInt(seleccionado[0].getAttribute("fila"));
        var columnaInicial = parseInt(seleccionado[0].getAttribute("columna"));
        var fichaRojaSelec = seleccionado[0].classList.contains("fichaRoja")
        var fichaRojaDamaSelec = seleccionado[0].classList.contains("fichaRojaDama")
        var fichaBlancaSelec = seleccionado[0].classList.contains("fichaBlanca")
        var fichaBlancaDamaSelec = seleccionado[0].classList.contains("fichaBlancaDama")

        if(fichaRojaSelec || fichaBlancaSelec){
            moverFichaComun(filaDestino, columnaDestino, seleccionado, filaInicial, columnaInicial, clickedCell);
        }
        else{
            moverFichaDama(filaDestino, columnaDestino, seleccionado, filaInicial, columnaInicial, clickedCell);
        }

    };

    function hayFichaSeleccionada(clickedCellEvent){
        var seleccionado = document.getElementsByClassName('seleccionado');
        if (seleccionado.length != 0){
            return true;
        }
        else{
            return false;
        }
    };

    function notAllowed(e){
        e.classList.add("notAllowed");
        setTimeout(function(){
            e.classList.remove("notAllowed");
        }, 1000);
    };

    function selecFicha(clickedCellEvent, fichaRoja, fichaBlanca, fichaRojaDama, fichaBlancaDama){
        var clickedCell = clickedCellEvent.target;
        if (clickedCell.classList.contains('seleccionado')){
            clickedCell.classList.remove('seleccionado');
        }
        else if ((fichaRoja || fichaRojaDama) && turno === "rojas"){
            clickedCell.classList.add('seleccionado');
        }
        else if ((fichaBlanca || fichaBlancaDama) && turno === "blancas"){
            clickedCell.classList.add('seleccionado');
        }
        else if ((fichaRoja || fichaRojaDama) && turno === "blancas"){
            notAllowed(clickedCell);
        }
        else if ((fichaBlanca || fichaBlancaDama) && turno === "rojas"){
            notAllowed(clickedCell);
        }
    };

    function nuevaPartida(){
        tablero.addEventListener("click", tableroClick);
        tablero.innerHTML = "";
        imprimirTablero();
        ptsBlanco = 0;
        ptsRojo = 0;
        turno = "rojas";
        mostrarModal();
        imprimirCartel();
    };

    function guardarPartida(){
        localStorage.setItem("save", tablero.innerHTML);
        localStorage.setItem("turno", turno);
        localStorage.setItem("nomJug1", nomJug1);
        localStorage.setItem("nomJug2", nomJug2);
    };

    function cargarPartida(){
        turno = localStorage.getItem("turno");
        tablero.innerHTML = localStorage.getItem("save");
        nomJug1 = localStorage.getItem("nomJug1")
        nomJug2 = localStorage.getItem("nomJug2")
        imprimirCartel();
    };

    function mostrarModal(){
        modalNuePart.style.display = "block";
    };

    function cerrarModal(){
        modalNuePart.style.display = "none";
    };

    function cerrarModalCartel(){
        modalCartel.style.display = "none";
    };

    function abrirModalPuntaje(){
        cargarTablaPuntaje(cargarPuntaje());
        modalPuntaje.style.display = "block";
    };

    function cerrarModalPuntaje(){
        modalPuntaje.style.display = "none";
    };

    function cargarTablaPuntaje(cargaTablaPuntaje){
        tbodyModalPuntaje.innerHTML = ''
        if(cargaTablaPuntaje)
        cargaTablaPuntaje.forEach((puntaje) => {
            let row = tbodyModalPuntaje.insertRow();
            row.insertCell().innerHTML = puntaje.fecha;
            row.insertCell().innerHTML = puntaje.nomJug1;
            row.insertCell().innerHTML = puntaje.ptsBlanco;
            row.insertCell().innerHTML = puntaje.nomJug2;
            row.insertCell().innerHTML = puntaje.ptsRojo;
        })

    }

    function ordenarFecha(){
        tbodyModalPuntaje.innerHTML = "";

        let tablaPuntaje = [];

        if(cargarPuntaje()){
            tablaPuntaje = cargarPuntaje();
        }

        if(fechaMayor){
            tablaPuntaje.sort((a, b) => {
            if(a.fecha > b.fecha)
                return 1;
            if(a.fecha < b.fecha)
                return -1;

            return 0;
            })
        }
        else{
            tablaPuntaje.sort((a, b) => {
                if(a.fecha < b.fecha)
                    return 1;
                if(a.fecha > b.fecha)
                    return -1;

                return 0;
                })
        }
        cargarTablaPuntaje(tablaPuntaje);

        fechaMayor = !fechaMayor
    }

    function ordenarPuntajeJug1(){
        tbodyModalPuntaje.innerHTML = "";

        let tablaPuntaje = [];

        if(cargarPuntaje()){
            tablaPuntaje = cargarPuntaje();
        }

        if(puntajeMayorJug1){
            tablaPuntaje.sort((a, b) => {
            if(a.ptsBlanco > b.ptsBlanco)
                return 1;
            if(a.ptsBlanco < b.ptsBlanco)
                return -1;

            return 0;
            })
        }
        else{
            tablaPuntaje.sort((a, b) => {
                if(a.ptsBlanco < b.ptsBlanco)
                    return 1;
                if(a.ptsBlanco > b.ptsBlanco)
                    return -1;

                return 0;
                })
        }
        cargarTablaPuntaje(tablaPuntaje);

        puntajeMayorJug1 = !puntajeMayorJug1
    }

    function ordenarPuntajeJug2(){
        tbodyModalPuntaje.innerHTML = "";

        let tablaPuntaje = [];

        if(cargarPuntaje()){
            tablaPuntaje = cargarPuntaje();
        }

        if(puntajeMayorJug2){
            tablaPuntaje.sort((a, b) => {
            if(a.ptsRojo > b.ptsRojo)
                return 1;
            if(a.ptsRojo < b.ptsRojo)
                return -1;

            return 0;
            })
        }
        else{
            tablaPuntaje.sort((a, b) => {
                if(a.ptsRojo < b.ptsRojo)
                    return 1;
                if(a.ptsRojo > b.ptsRojo)
                    return -1;

                return 0;
                })
        }
        cargarTablaPuntaje(tablaPuntaje);

        puntajeMayorJug2 = !puntajeMayorJug2
    }

    function guardNombre(){
        nomJug1 = document.getElementById("jugador1").value;
        nomJug2 = document.getElementById("jugador2").value;
        cerrarModal();
        imprimirCartel();
    };
    imprimirTablero();
    imprimirCartel();
}