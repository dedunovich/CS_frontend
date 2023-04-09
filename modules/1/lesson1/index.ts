function createBitGetter(arr: Uint8Array) {
  return {
    get(elementNumber: number, bitNumber: number): 0 | 1 {
      if (bitNumber >= 0 && elementNumber >= 0) {
        return ((arr[elementNumber] >> bitNumber) % 2) as 0 | 1;
      }
    },
  };
}

const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));

console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0

function createBitAccessor(arr: Uint8Array) {
  return {
    get: createBitGetter(arr).get,
    set(elementNumber: number, bitNumber: number, value: 0 | 1): void {
      if (
        bitNumber >= 0 &&
        elementNumber >= 0 &&
        elementNumber < arr.length &&
        (value === 0 || value === 1)
      ) {
        if (this.get(elementNumber, bitNumber) === 0 && value === 1) {
          arr[elementNumber] = arr[elementNumber] | (value << bitNumber);
        }
        if (this.get(elementNumber, bitNumber) === 1 && value === 0) {
          arr[elementNumber] = arr[elementNumber] & (value << bitNumber);
        }
      }
    },
  };
}

const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

console.log(bitAccessor.get(0, 1)); // 1
bitAccessor.set(0, 1, 0);
console.log(bitAccessor.get(0, 1)); // 0
