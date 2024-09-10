import {AREA_BAJO_CURVA} from "../data/graphics/area_bajo_la_curva.js";
import {CHI_CUADRADA} from "../data/graphics/chi_cuadrada.js";
import {saveResult} from "./firebase.js";
export function graphValues(resultObject,idFormula,sign='',alpha=''){
    resultObject.sign = sign;
    resultObject.alpha = alpha;
    console.log(resultObject);
    switch (idFormula) {
        case '1':
            return distribucionMedias(resultObject);
        case '2':
            return  distribucionVarianza(resultObject);
        case '3':
            return distribucionProporcion(resultObject);
        case '6':
            return hipotesisMedias(resultObject);
        case '7':
            return hipotesisMedias(resultObject);
        case '8':
            return hipotesisVarianzas(resultObject);
        case '9':
            return hipotesisMediasPoblaciones(resultObject);



    }
    //console.log(chiCuadrado(graphObject['X^2'],graphObject.n_val,graphObject.sign));
    //console.log(searchZValue(graphObject.Z,graphObject.sign));
    //searchZValue(graphObject.z,graphObject.sign);

    //hipotesis medias
    //hipotesisMedias(resultObject);


}

function hipotesisMediasPoblaciones (resultObject){
    resultObject.Z = resultObject.z;
    return (hipotesisMedias(resultObject));
}

function distribucionMedias (resultObject){

    const probabilityResult =  searchZValue(resultObject.z.toFixed(4));

    const textResult = `P(Z) = ${probabilityResult}`

    const limit = resultObject.u > resultObject.x ? `x=${resultObject.x}`  : `y=${resultObject.x}`;

    if (probabilityResult){
        saveResult(`z=${resultObject.z.toFixed(4)} ,${textResult}`)
        return  `/gauss?m=${resultObject.u}&${limit}&res=${textResult}`
    }
    
    return '';

    
}

function distribucionProporcion (resultObject){
    let probability =  searchZValue(parseFloat((resultObject.Z).toFixed(4)));
    const probabilityResult = resultObject.sign === '>' ? parseFloat((1-probability).toFixed(4)) : probability;
    const textResult = `P(p) = ${probabilityResult}`
    const limit = resultObject.p_prom > resultObject.P ? `y=${resultObject.p_prom}`  : `x=${resultObject.p_prom}`;

    if(probabilityResult){
        saveResult(`p = ${resultObject.Z.toFixed(4)} , ${textResult}`)
        return `/gauss?m=${resultObject.P}&${limit}&res=${textResult}`
    }
    const resultData = {
        probabilityResult
    }

}

function distribucionVarianza(resultObject){
    const probabilityResult =  chiCuadrado(resultObject['X^2'],resultObject['n_val'])
    const textResult = `P(S) = ${probabilityResult}`
    if(probabilityResult) {
        saveResult(`X^2 = ${resultObject['X^2']} , ${textResult}`)
        return `/gauss?m=${resultObject['X^2'] + 10}&x=${resultObject['X^2']}&res=${textResult}`
    }

    return '';
}

function hipotesisVarianzas(resultObject){
    if(resultObject.sign === '!='){
       const yValue = chiCuadrado(resultObject.alpha,resultObject.n,true,resultObject.alpha);
       const xValue = chiCuadrado(resultObject.alpha,resultObject.n,true,1-resultObject.alpha)
        let media = ((yValue - xValue) / 2);
        media = xValue + media;
        return `/gauss?m=${media}&x=${xValue}&y=${yValue}&z=${resultObject['X^2']}&res=P(X^2)=${resultObject['X^2']}`
    }
    const xValue = chiCuadrado(resultObject.alpha,resultObject.n,true,1-resultObject.alpha)
    return `/gauss?m=${xValue + 10}&x=${xValue}&z=${resultObject['X^2']}&res=P(X^2)=${resultObject['X^2']}`

}


function hipotesisMedias(resultObject){
    console.log(resultObject);
    const probability  = searchZValue(parseFloat(resultObject.Z).toFixed(4))
    const criticalValue = searchCriticalValueZ(resultObject.alpha,resultObject.sign);
    const probabilityResult  = resultObject.sign === '!=' ? parseFloat((1-probability).toFixed(4)) : probability;

    const resultData = {
        probability,
        criticalValue,
        probabilityResult
    }

    if(probabilityResult) {
        saveResult(`z=${resultObject.Z} , P(Z)=${probabilityResult}`)
        switch (resultObject.sign) {
            case '!=':
                return `/gauss?m=${0}&x=${criticalValue*-1}&y=${criticalValue}&z=${resultObject.Z}&res=P(Z)=${probabilityResult}`
            case '>':
                return `/gauss?m=${0}&y=${criticalValue}&z=${resultObject.Z}&res=P(Z)=${probabilityResult}`
            default:
                return `/gauss?m=${0}&x=${criticalValue*-1}&z=${resultObject.Z}&res=P(Z)=${probabilityResult}`
        }
    }

    console.log(resultData);
}

export function searchZValue(value) {
    console.log(value);

    let ones = Math.floor(value); // Parte entera: -3
    let tenths  = Math.floor((value - ones) * 10); // Décimas: 5
    let hundreds = Math.round((value - ones - (tenths  / 10)) * 100); // Centésimas: 9

    let firstValue = ones + tenths  / 10; // -2.5
    let secondValue = hundreds / 100; // 0.09
    firstValue = + firstValue.toFixed(1)
    const valorZ = firstValue;
// Buscar el objeto que contiene el valor Z
    const tempObject = AREA_BAJO_CURVA.find(objeto => objeto.Z === valorZ);
    console.log(tempObject);
    if (tempObject) {
        const result = tempObject[secondValue];
        if (result !== undefined) {
            console.log(result);
            return result;

        } else {
            throw ("El número no fue encontrado en el objeto Z");
        }
    } else {
        throw ("No se encontró ningún objeto con el valor Z buscado");
    }

}

export function chiCuadrado(result,nValue,isHipotesis = false,searchValue){
    nValue = nValue - 1;

    let glBuscado = nValue;

    let objetoGL = CHI_CUADRADA.find(objeto => objeto['g.l.'] === glBuscado);
    if(isHipotesis){
        return objetoGL[searchValue.toString()]
    }


    if (objetoGL) {
        let segundoNumeroBuscado = result;
        let keys = Object.keys(objetoGL).filter(key => key !== 'g.l.').sort((a, b) => a - b);

        let numeroMasCercano = keys.reduce((anterior, actual) => {
            return Math.abs(objetoGL[actual] - segundoNumeroBuscado) < Math.abs(objetoGL[anterior] - segundoNumeroBuscado) ? actual : anterior;
        });
        return numeroMasCercano;
        // return sign === '<' ?  1-numeroMasCercano : numeroMasCercano;
    } else {
       throw ("No se encontró ningún objeto con el valor de 'g.l.' buscado");
    }
}

export function searchCriticalValueZ(alpha,sign){
    const numero = sign === '!=' ?  alpha/2:alpha;

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

    return (zValue+parseFloat(parametroMasCercano));

    //console.log({ valor: valorMasCercano, objeto: objetoMasCercano,parametroMasCercano }) ;
}