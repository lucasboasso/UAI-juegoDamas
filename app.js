window.onload = function() {
    var tablero = document.getElementById("tablero");

    /* 
    0 = Cuadrado Blanco
    1 = Cuadrado Negro
    2 = Cuadrado Blanco con Ficha Blanca
    3 = Cuadrado Blanco con Ficha Negra
    4 = Cuadrado Negro con Ficha Blanca
    5 = Cuadrado Negro con Ficha Negra
    */

    var estadoJuego = [
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],        
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0]
    ]        
    estadoJuego.forEach(function(row){
        row.forEach(function(cell){
            var cuadrado = document.createElement('div')            
            if(cell === 0){
                cuadrado.className = "cuadradoBlanco";
                tablero.appendChild(cuadrado)
            }
            else if(cell === 1){
                cuadrado.className = "cuadradoNegro";                
                tablero.appendChild(cuadrado)
            }
            cuadrado.style.backgroundPosition
        console.log(cuadrado)
        })
    });


   /* cuadradoBlanco.className = "cuadradoBlanco";
   cuadradoNegro.className = "cuadradoNegro"; */
    
}