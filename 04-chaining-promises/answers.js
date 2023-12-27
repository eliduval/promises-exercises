/**
 * 
 * EXERCISE 1
 * 
 * @param {Promise} promise 
 * @param {function} asyncTransformer 
 */
function flatMapPromise(promise, asyncTransformer){
  return new Promise((resolve, reject) => {
    promise
      .then((v)=> resolve(asyncTransformer(v)))
      .catch((e)=> reject(e))
  });
}

/**
 * 
 * EXERCISE 2
 * 
 * @param {Promise} firstPromise 
 * @param {function} slowAsyncProcess 
 */
function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess){
  return firstPromise.then((v)=>{return slowAsyncProcess(v)});
}

/**
 * 
 * EXERCISE 3
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeGetUserByIdWithOrganization(getUserById, getOrganizationById){
  return function getUserByIdWithOrganization(userId){
    return getUserById(userId).then((us)=>
    {if (us===undefined){return undefined}
    return getOrganizationById(us.organizationId).then(org=>{us.organization=org; return us})})

  };
}

/**
 * 
 * EXERCISE 4
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
*/
function makeGetUserAndOrganizationById(getUserById, getOrganizationById){
  /**
   * @param {string} userId
   * @param {string} organizationId
   */
  return function getUserByIdWithOrganization(userId, organizationId){
   return Promise.all([getUserById(userId),getOrganizationById(organizationId)])
              .then(([res1,res2])=>{
                if((res1===undefined) || (res2===undefined)){return undefined}
                res1.organization=res2
                return res1
              })
  };
}

/**
 * 
 * EXERCISE 5
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeGetUsersByIdWithOrganizations(getUserById, getOrganizationById){
  /**
   * @param {Array<string>} userIds
   */
  return function getUserByIdWithOrganization(userIds){
    promises = userIds.map(i=>getUserById(i));
   return Promise.all(promises).then(users=>{
    res = [];
    for (const u of users){
      if (u===undefined){res.push(undefined)}
      getOrganizationById(u.organizationId).then(o=>{u.organization=o; res.push(u)});

    }return res})
  };
}

module.exports = {
  flatMapPromise,
  chainTwoAsyncProcesses,
  makeGetUserByIdWithOrganization,
  makeGetUserAndOrganizationById,
  makeGetUsersByIdWithOrganizations,
};