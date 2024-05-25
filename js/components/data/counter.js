var counter = 0;

export function countNext(){
    counter = counter + 1;
    return counter;
}

export function resetCounter(){
    counter = 0;
}