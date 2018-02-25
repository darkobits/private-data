import privateData from './private-data';


describe('Private Data', () => {
  const key = 'privateKey';
  const value = 'foo';

  describe('initializing', () => {
    it('should be able to read and write to a the private data store', () => {
      const $ = privateData();

      class Foo {
        setPrivate(value) {
          $(this)[key] = value;
        }

        getPrivate() {
          return $(this)[key];
        }
      }

      const myFoo = new Foo();
      myFoo.setPrivate(value);

      expect(myFoo.getPrivate()).toEqual(value);
      expect(myFoo[key]).toBe(undefined);
    });
  });

  describe('avoiding collisions', () => {
    it('should keep data separate between instances', () => {
      const $ = privateData();

      const value2 = 'bar';

      class Foo {
        setPrivate(value) {
          $(this)[key] = value;
        }

        getPrivate() {
          return $(this)[key];
        }
      }

      const myFoo1 = new Foo();
      const myFoo2 = new Foo();

      myFoo1.setPrivate(value);
      myFoo2.setPrivate(value2);

      expect(myFoo1.getPrivate()).toEqual(value);
      expect(myFoo2.getPrivate()).toEqual(value2);
      expect(myFoo1.getPrivate()).not.toEqual(myFoo2.getPrivate());
    });
  });

  describe('tampering with native methods', () => {
    const originalGet = WeakMap.prototype.get;
    const originalSet = WeakMap.prototype.set;

    it('should throw an error if WeakMap.prototype.get has been tampered with', () => {
      WeakMap.prototype.get = function () { }; // eslint-disable-line no-extend-native

      expect(() => {
        privateData();
      }).toThrow('WeakMap.prototype.get may have been tampered-with');
    });

    it('should throw an error if WeakMap.prototype.set has been tampered with', () => {
      WeakMap.prototype.set = function () { }; // eslint-disable-line no-extend-native

      expect(() => {
        privateData();
      }).toThrow('WeakMap.prototype.set may have been tampered-with');
    });

    afterEach(() => {
      WeakMap.prototype.get = originalGet; // eslint-disable-line no-extend-native
      WeakMap.prototype.set = originalSet; // eslint-disable-line no-extend-native
    });
  });
});
