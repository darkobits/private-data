import createClassDecorator from '@darkobits/class-decorator';

/**
 * Creates a new Weak Map and returns a function which:
 *
 * - Has an init() method which takes a class instance and creates a new empty
 *   object to hold any private data for that instnace.
 * - Can be invoked with a class instnace and will return the instance's private
 *   data object.
 */
function createStore() {
  const map = new WeakMap();

  function get(context) {
    return map.get(context);
  }

  get.init = context => map.set(context, {});

  return get;
}

const store = createStore();

/**
 * Class decorator which accepts a reference to a private data store and
 * initializes newly created class instnaces with the store.
 *
 * @param {function} store - Reference to the data store exported by this module.
 * @return {function} - Class decorator.
 */
export function privateData(st) {
  if (st !== store) {
    throw new Error('[private-data] Expected a reference to this module\'s data store.');
  }

  return createClassDecorator(function (ctor, ...args) {
    st.init(this);
    return ctor(...args);
  });
}

// Export the shared data store as the default export, allowing consumers to use
// any naming convention for it.
export default store;
