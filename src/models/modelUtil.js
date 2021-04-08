export default class ModelUtil {
  static DeferedPromise = function (handler) {
    let resolve, reject;
    let promise = new Promise((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
      if (handler) handler(resolve, reject);
    });

    promise.resolve = resolve;
    promise.reject = reject;
    return promise;
  };
}
