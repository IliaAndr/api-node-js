// === ARRAYS ===
let numbers: number[] = [1, 2, 3];
console.log(numbers);
console.log('numbers array length: ', numbers.length);

let mammals: string[] = ['cat', 'dog'];
mammals.push('goat');
console.log(mammals);
console.log('mammals array length: ', mammals.length);

let fishes: string[] = ['flatfish', 'cod', 'pike'];
fishes.pop();
console.log(fishes);
console.log('fishes array length: ', fishes.length);

let emptyArrayNumbers: number[] = [];
emptyArrayNumbers.push(1);
console.log('array length after the first addition: ', emptyArrayNumbers.length);
emptyArrayNumbers.push(2);
console.log('array length after the second addition: ', emptyArrayNumbers.length);

// === LOOPS ===
let numbersForLoop: number[] = [1, 2, 3, 4, 5];
for (let i = 0; i < numbersForLoop.length; i++) {
    console.log('array element: ', numbersForLoop[i]);
}

let fiveNumberArray: number[] = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i < fiveNumberArray.length; i++) {
    sum += fiveNumberArray[i];
}
console.log('sum: ', sum);

let threeNumberArray: number[] = [1, 2, 3];
let multipliedArray: number[] = [];
for (let i = 0; i < threeNumberArray.length; i++) {
    let multiplyEachElement = threeNumberArray[i]*2;
    multipliedArray.push(multiplyEachElement);
}
console.log('new array in which each element of the original array is multiplied by 2: ', multipliedArray);

let newThreeNumberArray: number[] = [1, 2, 3];
for (let i = newThreeNumberArray.length - 1; i >= 0; i--) {
    console.log('array element: ', newThreeNumberArray[i]);
}

// === TYPICAL INTERVIEW TASKS ===
let findMaxValue: number[] = [1, 2, 23, 4, 5];
let maxValue = findMaxValue[0];
for (let i = 1; i < findMaxValue.length; i++) {
    if (maxValue < findMaxValue[i]) {
        maxValue = findMaxValue[i];
    }
}
console.log('maximum value: ', maxValue);

let findMinimumValue: number[] = [1, 2, -3, 4, 5];
let minimumValue = findMinimumValue[0];
for (let i = 1; i < findMinimumValue.length; i++) {
    if (minimumValue > findMinimumValue[i]) {
        minimumValue = findMinimumValue[i];
    }
}
console.log('minimum value: ', minimumValue);

let numList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evenCount = 0
for (let i = 0; i < numList.length; i++) {
    if (numList[i] % 2 === 0) {
        evenCount++
    }
}
console.log('the number of even numbers is: ', evenCount);

let numArray: number[] = [1, -2, -3, 4, 5, -6, -7, 8, 9, -10];
let positiveNumbers: number[] = [];
for (let i = 0; i < numArray.length; i++) {
    if (numArray[i] > 0) {
        positiveNumbers.push(numArray[i]);
    }
}
console.log('positive numbers: ', positiveNumbers);



