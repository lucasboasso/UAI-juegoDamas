    /*
    0 = Cuadrado Blanco Vacio
    1 = Cuadrado Negro Vacio
    2 = Cuadrado Negro con Ficha Blanca
    3 = Cuadrado Negro con Ficha Roja
    */
window.onload = function(){
    const tablero = document.getElementById("tablero");
    const btnNuevaPartida = document.getElementById("nuevaPartida");
    const btnGuardarPartida = document.getElementById("guardarPartida");
    const btnCargarPartida = document.getElementById("cargarPartida");
    const modalCerrar = document.getElementById("closeModalPlayer");
    const modalCartelCerrar = document.getElementById("cerrarModalGanador");
    const modalGuardar = document.getElementById("guardNomb");
    const modalNuePart = document.getElementById("modalJugadores");
    const modalCartel = document.getElementById("modalCartel");
    const ganador = document.getElementById("ganador");

    btnNuevaPartida.addEventListener("click", nuevaPartida, true);
    btnGuardarPartida.addEventListener("click", guardarPartida, true);
    btnCargarPartida.addEventListener("click", cargarPartida, true);

    modalCerrar.addEventListener("click", cerrarModal, true);
    modalCartelCerrar.addEventListener("click", cerrarModalCartel, true);
    modalGuardar.addEventListener("click", guardNombre, true);

    var nomJug1 = "Jugador 1";
    var nomJug2 = "Jugador 2";
    var turno = "rojas";
    var ptsBlanco = 0;
    var ptsRojo = 0;

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
        const clickedCell = clickedCellEvent.target;
        const fichaRoja = clickedCell.classList.contains('fichaRoja');
        const fichaBlanca = clickedCell.classList.contains('fichaBlanca');
        if(hayFichaSeleccionada(clickedCellEvent) && (fichaRoja || fichaBlanca) == false){
            moverFicha(clickedCellEvent);
        }
        else if(hayFichaSeleccionada(clickedCell) && (fichaRoja || fichaBlanca)){
            seleccionado[0].classList.remove('seleccionado');
            selecFicha(clickedCellEvent);
        }
        else{
            selecFicha(clickedCellEvent);
        }
    };

    function esDama(turno, filaDestino, clickedCell){
        if (filaDestino == 0 && turno === "rojas"){
            clickedCell.classList.remove('fichaRoja');
            clickedCell.classList.add('fichaRojaDama');
        }
        else if(filaDestino == 7 && turno === "blancas"){
            clickedCell.classList.remove('fichaBlanca');
            clickedCell.classList.add('fichaBlancaDama');
        }
    };

    function ganoPartida(){
        if(ptsBlanco == 12){
            modalCartel.style.display = "block";
            ganador.innerHTML = `Ganador ${nomJug1}`
            tablero.removeEventListener("click", tableroClick, true);
        }
        else if(ptsRojo == 12){
            modalCartel.style.display = "block";
            ganador.innerHTML = `Ganador ${nomJug2}`
            tablero.removeEventListener("click", tableroClick, true);
        }
    };

    function moverFicha(clickedCellEvent){
        const clickedCell = clickedCellEvent.target;
        var filaDestino = parseInt(clickedCell.getAttribute("fila"));
        var columnaDestino = parseInt(clickedCell.getAttribute("columna"));
        var seleccionado = document.getElementsByClassName('seleccionado');
        var filaInicial = parseInt(seleccionado[0].getAttribute("fila"));
        var columnaInicial = parseInt(seleccionado[0].getAttribute("columna"));
        if(turno === "rojas"){
            if((filaDestino == filaInicial - 1) && (columnaDestino == columnaInicial - 1 || columnaDestino == columnaInicial + 1)){
                clickedCell.classList.add('fichaRoja');
                seleccionado[0].classList.remove('fichaRoja', 'seleccionado');
                esDama(turno, filaDestino, clickedCell);
                cambioJugador();
            }
            else if((filaDestino == filaInicial - 2) && (columnaDestino == columnaInicial - 2 || columnaDestino == columnaInicial + 2)){
                if((columnaDestino == columnaInicial - 2)){
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
            }
        }
        else if(turno === "blancas"){
            if((filaDestino == filaInicial + 1) && (columnaDestino == columnaInicial - 1 || columnaDestino == columnaInicial + 1)){
                clickedCell.classList.add('fichaBlanca');
                seleccionado[0].classList.remove('fichaBlanca', 'seleccionado');
                esDama(turno, filaDestino, clickedCell);
                cambioJugador();
            }
            else if((filaDestino == filaInicial + 2) && (columnaDestino == columnaInicial - 2 || columnaDestino == columnaInicial + 2)){
                if((columnaDestino == columnaInicial - 2)){
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
            }
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

    function selecFicha(clickedCellEvent){
        const clickedCell = clickedCellEvent.target;
        var fichaRoja = clickedCell.classList.contains('fichaRoja');
        var fichaBlanca = clickedCell.classList.contains('fichaBlanca');
        if (clickedCell.classList.contains('seleccionado')){
            clickedCell.classList.remove('seleccionado');
        }
        else if (fichaRoja && turno === "rojas"){
            clickedCell.classList.add('seleccionado');
        }
        else if (fichaBlanca && turno === "blancas"){
            clickedCell.classList.add('seleccionado');
        }
        else if (fichaRoja && turno === "blancas"){
            notAllowed(clickedCell);
        }
        else if (fichaBlanca && turno === "rojas"){
            notAllowed(clickedCell);
        }
    };

    function nuevaPartida(){
        tablero.addEventListener("click", tableroClick, true);
        tablero.innerHTML = "";
        imprimirTablero();
        turno = "rojas";
        mostrarModal();
        imprimirCartel();
    };

    function guardarPartida(){
        localStorage.setItem("save", tablero.innerHTML);
        localStorage.setItem("turno", turno);
    };

    function cargarPartida(){
        turno = localStorage.getItem("turno");
        tablero.innerHTML = localStorage.getItem("save");
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

    function guardNombre(){
        nomJug1 = document.getElementById("jugador1").value;
        nomJug2 = document.getElementById("jugador2").value;
        cerrarModal();
        imprimirCartel();
    };
    imprimirTablero();
    imprimirCartel();
}