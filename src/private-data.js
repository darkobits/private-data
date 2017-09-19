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
 * Class decorator which creates an entry in this module's Weak Map for the
 * newly created instance.
 *
 * @return {function} - Class decorator.
 */
export const privateData = createClassDecorator(function (ctor, ...args) {
  store.init(this);
  return ctor(...args);
});

// Export the shared data store as the default export, allowing consumers to use
// any naming convention for it.
export default store;
