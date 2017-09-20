export default function () {
  const data = new WeakMap();

  return function (context) {
    if (!data.get(context)) {
      data.set(context, {});
    }

    return data.get(context);
  };
}
