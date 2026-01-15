const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'epiconnect',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const listPublicProjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicProjects');
}
listPublicProjectsRef.operationName = 'ListPublicProjects';
exports.listPublicProjectsRef = listPublicProjectsRef;

exports.listPublicProjects = function listPublicProjects(dc) {
  return executeQuery(listPublicProjectsRef(dc));
};

const updateMyBioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyBio', inputVars);
}
updateMyBioRef.operationName = 'UpdateMyBio';
exports.updateMyBioRef = updateMyBioRef;

exports.updateMyBio = function updateMyBio(dcOrVars, vars) {
  return executeMutation(updateMyBioRef(dcOrVars, vars));
};

const getMyPostsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyPosts');
}
getMyPostsRef.operationName = 'GetMyPosts';
exports.getMyPostsRef = getMyPostsRef;

exports.getMyPosts = function getMyPosts(dc) {
  return executeQuery(getMyPostsRef(dc));
};
