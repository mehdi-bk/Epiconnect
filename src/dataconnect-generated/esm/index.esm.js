import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'epiconnect',
  location: 'us-east4'
};

export const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';

export function createUser(dc) {
  return executeMutation(createUserRef(dc));
}

export const listPublicProjectsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListPublicProjects');
}
listPublicProjectsRef.operationName = 'ListPublicProjects';

export function listPublicProjects(dc) {
  return executeQuery(listPublicProjectsRef(dc));
}

export const updateMyBioRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateMyBio', inputVars);
}
updateMyBioRef.operationName = 'UpdateMyBio';

export function updateMyBio(dcOrVars, vars) {
  return executeMutation(updateMyBioRef(dcOrVars, vars));
}

export const getMyPostsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyPosts');
}
getMyPostsRef.operationName = 'GetMyPosts';

export function getMyPosts(dc) {
  return executeQuery(getMyPostsRef(dc));
}

