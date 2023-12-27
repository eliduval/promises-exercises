
/**
 * 
 * EXERCISE 1
 * 
 * @returns {Promise<3>}
 */
async function makePromiseResolveWith3(){
  return new Promise((resolve)=>resolve(3))
}

/**
 * 
 * EXERCISE 2
 * 
 * @returns {Promise<,"Boo!">}
 */
async function makePromiseRejectWithBoo(){
  return new Promise((resolve,reject)=>reject('Boo!'))
}

/**
 * 
 * EXERCISE 3
 * 
 * @param {Promise} firstPromise 
 * @param {function} slowAsyncProcess 
 */
async function chainTwoAsyncProcesses(firstPromise, slowAsyncProcess){
  r1 = await firstPromise;
  return await slowAsyncProcess(r1)
}

/**
 * 
 * EXERCISE 4
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeAsyncGetUserByIdWithOrganization(getUserById, getOrganizationById){
  /**
   * @param {string} userId 
   */
  return async function getUserByIdWithOrganization(userId){
    user = await getUserById(userId);
    if (user===undefined){return undefined}
    org = await getOrganizationById(user.organizationId)
    if (org===undefined){return undefined}
    user.organization = org;
    return user
  };
}
  
/**
 * 
 * EXERCISE 5
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeAsyncGetUserAndOrganizationById(getUserById, getOrganizationById){
  /**
   * @param {string} userId 
   * @param {string} organizationId
  */
  return async function getUserByIdWithOrganization(userId, organizationId){
    [user, org] = await Promise.all([getUserById(userId),getOrganizationById(organizationId)])
    if (user===undefined || org===undefined){return undefined}
    user.organization = org;
    return user
  };
}

/**
 * 
 * EXERCISE 6
 * 
 * @param {function} getUserById 
 * @param {function} getOrganizationById 
 */
function makeAsyncGetUsersByIdWithOrganizations(getUserById, getOrganizationById){
  /**
   * @param {Array<string>} userIds
   */
  return async function getUserByIdWithOrganization(userIds){
    /* IMPLEMENT ME! */
    promises_u =  userIds.map(i=>getUserById(i));
    const users = await Promise.all(promises_u)
    real_users = users.filter(u=>!(u===undefined))
    promises_o = real_users.map(u=> getOrganizationById(u.organizationId))
    const orgs = await Promise.all(promises_o)
    res =[]
    let nb_undef = 0
    for (let u = 0; u < users.length; u++){
        let user = users[u]
        if (user ===undefined){
          res.push(undefined)
          nb_undef=nb_undef+1}
        else{
          const org = orgs[u-nb_undef]
          if (org ===undefined){res.push(undefined)}
          else{user.organization=org
          res.push(user)}}
    }
    return res

  };
}


module.exports = {
  makePromiseResolveWith3,
  makePromiseRejectWithBoo,
  chainTwoAsyncProcesses,
  makeAsyncGetUserByIdWithOrganization,
  makeAsyncGetUserAndOrganizationById,
  makeAsyncGetUsersByIdWithOrganizations,
};