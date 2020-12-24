/**
 * @private
 *
 * Naive check to determine if prototype methods have been tampered-with.
 *
 * See: https://davidwalsh.name/detect-native-function
 */
function isNative(fn: (...args: Array<any>) => any) {
  return (/{\s*\[native code]\s*}/).test(String(fn));
}


/**
 * Checks that native methods are (probably) intact, creates a new WeakMap, and
 * returns a function that accepts a context and returns an object it may use
 * for storing private fields/methods.
 */
export default function createPrivateDataStore() {
  if (!isNative(WeakMap.prototype.get)) {
    throw new Error('[private-data] WeakMap.prototype.get may have been tampered-with.');
  }

  if (!isNative(WeakMap.prototype.set)) {
    throw new Error('[private-data] WeakMap.prototype.set may have been tampered-with.');
  }

  const data = new WeakMap();

  return (context: any) => {
    if (!data.get(context)) {
      data.set(context, {});
    }

    return data.get(context);
  };
}
