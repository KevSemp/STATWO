import {AREA_BAJO_CURVA} from "../data/graphics/area_bajo_la_curva.js";
import {CHI_CUADRADA} from "../data/graphics/chi_cuadrada.js";

export function searchZValue(value,sign) {
    let ones = Math.floor(value); // Parte entera: -3
    let tenths  = Math.floor((value - ones) * 10); // Décimas: 5
    let hundreds = Math.round((value - ones - (tenths  / 10)) * 100); // Centésimas: 9

    let firstValue = ones + tenths  / 10; // -2.5
    let secondValue = hundreds / 100; // 0.09
    const valorZ = firstValue;
// Buscar el objeto que contiene el valor Z
    const tempObject = AREA_BAJO_CURVA.find(objeto => objeto.Z === valorZ);

    if (tempObject) {
        const result = tempObject[secondValue];
        if (result !== undefined) {
            console.log(result);
            return sign === '<' ?  1-result : result;

        } else {
            console.log("El número no fue encontrado en el objeto Z");
        }
    } else {
        console.log("No se encontró ningún objeto con el valor Z buscado");
    }

}

export function chiCuadrado(result,nValue,sign){
    nValue = nValue - 1;

    let glBuscado = nValue;

    let objetoGL = CHI_CUADRADA.find(objeto => objeto['g.l.'] === glBuscado);

    if (objetoGL) {
        let segundoNumeroBuscado = result;
        let keys = Object.keys(objetoGL).filter(key => key !== 'g.l.').sort((a, b) => a - b);

        let numeroMasCercano = keys.reduce((anterior, actual) => {
            return Math.abs(objetoGL[actual] - segundoNumeroBuscado) < Math.abs(objetoGL[anterior] - segundoNumeroBuscado) ? actual : anterior;
        });
        return sign === '<' ?  1-numeroMasCercano : numeroMasCercano;
    } else {
        console.log("No se encontró ningún objeto con el valor de 'g.l.' buscado");
    }
}

export function searchCriticalValueZ(){
    const numero = 0.025;
    let valorMasCercano;
    let objetoMasCercano;
    let parametroMasCercano;
    let diferenciaMasCercana = Infinity;

    for (const objeto of AREA_BAJO_CURVA) {
        for (const key in objeto) {
            if (key !== "Z" && key !== "0") {
                const valor = objeto[key];
                const diferencia = Math.abs(numero - valor);
                if (diferencia < diferenciaMasCercana) {
                    diferenciaMasCercana = diferencia;
                    valorMasCercano = valor;
                    objetoMasCercano = objeto;
                    parametroMasCercano = key
                }
            }
        }
    }

    let zValue = (objetoMasCercano.Z);
    zValue = zValue<0 ? (objetoMasCercano.Z)*-1 : objetoMasCercano.Z;
    console.log(zValue+parseFloat(parametroMasCercano));


    console.log({ valor: valorMasCercano, objeto: objetoMasCercano,parametroMasCercano }) ;
}