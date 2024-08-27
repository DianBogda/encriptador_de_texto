function asignarTexto(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function mensajeInicio() {
    document.addEventListener('DOMContentLoaded', function() {
        swal("Hola, ¿cuál es tu nombre?", {
            content: "input",
        })
        .then((value) => {
            let nombreMayuscula = value.charAt(0).toUpperCase() + value.slice(1);
            asignarTexto("#mjeBienvenida", `${nombreMayuscula}`);
        });
    });   
    return;
}
mensajeInicio();

function limpiarElemento(elemento) {
    document.querySelector(elemento).value = "";
    return;
}

function deshabilitarBoton(idElemento, booleano) {
    document.getElementById(idElemento).disabled = booleano;
    return;
}

function ocultarElemento(idElemento) {
    document.getElementById(idElemento).style.display = "none";
    return;
}

function mostrarElemento(idElemento) {
    document.getElementById(idElemento).style.display = "block";
    return;
}

function reemplazarLetras(texto) {
    let nuevaPalabra = texto.replace(/[aeiou]/gi, (valorReemplazo) => {
        switch (valorReemplazo) {
            case "a":
                return "ai";
            case "e":
                return "enter";
            case "i":
                return "imes";
            case "o":
                return "ober";
            case "u":
                return "ufat";
            default:
                return valorReemplazo;
        }
    });
    console.log("Texto encriptado: " + nuevaPalabra);
    asignarTexto("#mjeCifrado", nuevaPalabra);
    return;
}

function encriptarTexto() {
    let textoUsuario = document.getElementById("valorUsuario").value;
    let textoMinuscula = textoUsuario.toLowerCase();
    console.log("Texto recibido en minúscula: " + textoMinuscula);

    let caracteresEspeciales = textoMinuscula.match(/[^a-z]/gi); //Encuentra todos los caracteres que no sean ni vocal, ni consonante.
    console.log(caracteresEspeciales);

    if(textoMinuscula.includes('á') || textoMinuscula.includes('é') || textoMinuscula.includes('í') 
        || textoMinuscula.includes('ó') || textoMinuscula.includes('ú') 
        || textoMinuscula.includes(caracteresEspeciales)) {
        asignarTexto("#mjeError", `ERROR, por favor vuelva a escribir "${textoUsuario}" sin acentos ni caracteres especiales.`);
        limpiarElemento("#valorUsuario");
    } else {
        reemplazarLetras(textoMinuscula); 
        asignarTexto("#mjeError", "");
        asignarTexto("#mjeTextoCopiado", "");
        ocultarElemento("div_aOcultar");
        mostrarElemento("copiar");
        deshabilitarBoton("cifrar", true); 
        deshabilitarBoton("descifrar", false);
        deshabilitarBoton("copiar", false);
        deshabilitarBoton("reset", false);
    }    
    return;
}

function resaltar(elemento, color) {
    document.getElementById(elemento).style.color = color;
    return;
}

function copiarTexto() {
    let textoEncriptado = document.getElementById("mjeCifrado").innerHTML;
    navigator.clipboard.writeText(textoEncriptado)
    .then(() => { 
        swal("¡Genial!", `El texto "${textoEncriptado}" ha sido copiado correctamente.`, "success");
        console.log('Contenido copiado al clipboard');
    })
    .catch(error => {
        swal("Lo siento", `El texto "${textoEncriptado}" no pudo ser copiado.`, "error");
        console.log('Falló al copiar', error);
    });
    limpiarElemento("#valorUsuario");
    deshabilitarBoton("copiar", true);
    asignarTexto("#mjeCifrado", "");
    resaltar("mjeCifrado", "#ff0806");
    asignarTexto("#mjeTextoCopiado", "Texto copiado, puede pegarlo donde lo necesite.");
    return;
}

function desencriptarTexto() {
    let textoEncriptado  = document.getElementById("valorUsuario").value;
    console.log("Texto a descifrar: " + textoEncriptado);
    let textoDescifrado = textoEncriptado.replace(/ai|enter|imes|ober|ufat/gi, (valorReemplazo) => {
        switch (valorReemplazo) {
            case "ai":
                return "a";
            case "enter":
                return "e";
            case "imes":
                return "i";
            case "ober":
                return "o";
            case "ufat":
                return "u";
            default:
                return valorReemplazo;
        }
    });    
    console.log("Texto descifrado: " + textoDescifrado);
    let textoPrimeraEnMayuscula = textoDescifrado.charAt(0).toUpperCase() + textoDescifrado.slice(1); 
    console.log("Palabra 1era mayúscula: " + textoPrimeraEnMayuscula); 
    asignarTexto("#mjeCifrado", textoPrimeraEnMayuscula);
    asignarTexto("#mjeTextoCopiado", "");
    ocultarElemento("div_aOcultar");
    mostrarElemento("copiar");
    deshabilitarBoton("descifrar", true); 
    deshabilitarBoton("cifrar", false); 
    deshabilitarBoton("copiar", false);
    deshabilitarBoton("reset", false);
    return;
}

function reiniciar() {
    resaltar("mjeCifrado", "#224c7f");
    asignarTexto("#mjeCifrado", "");
    asignarTexto("#mjeTextoCopiado", "");
    limpiarElemento("#valorUsuario");
    deshabilitarBoton("cifrar", false); 
    deshabilitarBoton("descifrar", false); 
    deshabilitarBoton("copiar", true);
    deshabilitarBoton("reset", true);
    ocultarElemento("copiar");
    mostrarElemento("div_aOcultar");
    return;
}