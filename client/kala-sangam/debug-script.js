// Debug script to identify undefined 'S' property errors
// This can be run in browser console to help identify the source

console.log('Starting debug for undefined S property error...');

// Override property access to catch undefined 'S' access
const originalDefineProperty = Object.defineProperty;
Object.defineProperty = function(obj, prop, descriptor) {
  if (prop === 'S') {
    console.log('Defining property S on:', obj);
    console.trace();
  }
  return originalDefineProperty.call(this, obj, prop, descriptor);
};

// Monitor global object access
const originalGet = Reflect.get;
Reflect.get = function(target, property, receiver) {
  if (property === 'S' && target === undefined) {
    console.error('Attempting to access property S on undefined object');
    console.trace();
  }
  return originalGet.call(this, target, property, receiver);
};

// Monitor prototype chain access
const originalGetPrototypeOf = Object.getPrototypeOf;
Object.getPrototypeOf = function(obj) {
  if (obj === undefined || obj === null) {
    console.warn('Getting prototype of undefined/null object');
    console.trace();
  }
  return originalGetPrototypeOf.call(this, obj);
};

console.log('Debug monitoring active. Check console for S property access attempts.');
