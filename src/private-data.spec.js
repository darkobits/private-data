import store from './private-data';


describe('Private Data', () => {
  const key = 'privateKey';
  const value = 'foo';

  describe('initializing', () => {
    it('should be able to read and write to a the private data store', () => {
      const $ = store();

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
      const $ = store();

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
});
