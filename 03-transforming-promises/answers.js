/**
 * 
 * EXERCISE 1
 * 
 * @param {*} promise 
 * @param {*} transformer 
 * @returns {Promise}
 */
function mapPromise(promise, transformer){
  return new Promise((resolve, reject) => {
    promise
    .then((res) => {
      try {
        const transformedValue = transformer(res);
        resolve(transformedValue);
      } catch (err) {
        reject(err);
      }
    })
    .catch(er => reject(er))
  });
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
function squarePromise(numberPromise){
  return numberPromise
    .then(r => {
      if (typeof r === 'number'){
        return r*r}
        else if (!isNaN(parseFloat(r))) {
          const numberValue = parseFloat(r);
          return numberValue * numberValue; }
      else {
        throw `Cannot convert '${r}' to a number!`;
      }
      
      })
    .catch(e=> {throw e})}

/**
 * EXERCISE 3
 * 
 * @param {Promise<number | string>} numberPromise 
 * @returns {Promise<number>}
 */
function squarePromiseOrZero(promise){
  return squarePromise(promise)
    .catch((e)=>{return 0}
    );
}

/**
 * EXERCISE 4
 * 
 * @param {Promise} promise 
 * @returns {Promise}
 */
function switcheroo(promise){
  return promise.then((v)=>{throw v},(w)=>{return w});
}

/**
 * @callback consumer
 * @param {*} value
 */

/**
 * @callback handler
 * @param {*} error
 */

module.exports = {
  mapPromise,
  squarePromise,
  squarePromiseOrZero,
  switcheroo,
};