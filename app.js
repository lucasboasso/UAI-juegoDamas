window.onload = function() {
    var tablero = document.getElementById("tablero");
   // var cuadradoBlanco = document.createElement('div');
   // var cuadradoNegro = document.createElement('div');

    //tablero.appendChild(cuadradoBlanco);
    //tablero.appendChild(cuadradoNegro);

    var estadoJuego = [
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
    ]        
    estadoJuego.forEach(function(row, j){
        var cuadrado = document.createElement('div')

        row.forEach(function(cell, i) {
        
            

        if(cell === 0){
            cuadrado.className = "cuadradoBlanco";
        }
        else if (cell === 1) {
            cuadrado.className = "cuadradoNegro";
        };
    });
        
        tablero.appendChild(cuadrado);
         });


   /* cuadradoBlanco.className = "cuadradoBlanco";
   cuadradoNegro.className = "cuadradoNegro"; */
    
}