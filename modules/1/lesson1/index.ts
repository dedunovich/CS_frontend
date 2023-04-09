function createBitGetter(arr: Uint8Array) {
  return {
    get(elementNumber: number, bitNumber: number): 0 | 1 {
      if (bitNumber >= 0 && elementNumber >= 0 && elementNumber < arr.length) {
        return ((arr[elementNumber] >> bitNumber) % 2) as 0 | 1;
      }
    },
  };
}

function createBitSetter(arr: Uint8Array) {
  return {
    set(elementNumber: number, bitNumber: number, value: 0 | 1): void {
      if (
        bitNumber >= 0 &&
        elementNumber >= 0 &&
        elementNumber < arr.length &&
        (value === 0 || value === 1)
      ) {
        if (value === 1) {
          arr[elementNumber] = arr[elementNumber] | (value << bitNumber);
        } else {
          arr[elementNumber] = arr[elementNumber] & (value << bitNumber);
        }
      }
    },
  };
}

const bitGetter = createBitGetter(new Uint8Array([0b10110111111, 0b1101]));

console.log(bitGetter.get(0, 9)); // 0
console.log(bitGetter.get(1, 1)); // 0

function createBitAccessor(arr: Uint8Array) {
  return {
    get: createBitGetter(arr).get,
    set: createBitSetter(arr).set,
  };
}

const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

console.log(bitAccessor.get(0, 1)); // 1
bitAccessor.set(0, 1, 0);
console.log(bitAccessor.get(0, 1)); // 0
