export function removeArrayElementByIndex(array, index){
    array.splice(index, 1);
}

export function removeArrayElement(array, elementToRemove){
    let index = array.indexOf(elementToRemove);
    
    if (index === -1) {
        console.error(`Impossibile rimuove l'elemento ${elementToRemove} nell'array ${array}`);
    }

    array.splice(index, 1);
}

export function isArrayEmpty(arrayToCheck){
   return arrayToCheck.lenght == 0;
}

export function isArrayOk(arrayToCheck){
    return Array.isArray(arrayToCheck) && arrayToCheck.length > 0;
}

export function isArrayNullOrEmpty(arrayToCheck){
    return !isArrayOk(arrayToCheck);
}