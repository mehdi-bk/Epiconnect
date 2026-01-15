# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListPublicProjects*](#listpublicprojects)
  - [*GetMyPosts*](#getmyposts)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateMyBio*](#updatemybio)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListPublicProjects
You can execute the `ListPublicProjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listPublicProjects(): QueryPromise<ListPublicProjectsData, undefined>;

interface ListPublicProjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicProjectsData, undefined>;
}
export const listPublicProjectsRef: ListPublicProjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listPublicProjects(dc: DataConnect): QueryPromise<ListPublicProjectsData, undefined>;

interface ListPublicProjectsRef {
  ...
  (dc: DataConnect): QueryRef<ListPublicProjectsData, undefined>;
}
export const listPublicProjectsRef: ListPublicProjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listPublicProjectsRef:
```typescript
const name = listPublicProjectsRef.operationName;
console.log(name);
```

### Variables
The `ListPublicProjects` query has no variables.
### Return Type
Recall that executing the `ListPublicProjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListPublicProjectsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListPublicProjectsData {
  projects: ({
    id: UUIDString;
    title: string;
    description: string;
  } & Project_Key)[];
}
```
### Using `ListPublicProjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listPublicProjects } from '@dataconnect/generated';


// Call the `listPublicProjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listPublicProjects();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listPublicProjects(dataConnect);

console.log(data.projects);

// Or, you can use the `Promise` API.
listPublicProjects().then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListPublicProjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listPublicProjectsRef } from '@dataconnect/generated';


// Call the `listPublicProjectsRef()` function to get a reference to the query.
const ref = listPublicProjectsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listPublicProjectsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## GetMyPosts
You can execute the `GetMyPosts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyPosts(): QueryPromise<GetMyPostsData, undefined>;

interface GetMyPostsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyPostsData, undefined>;
}
export const getMyPostsRef: GetMyPostsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyPosts(dc: DataConnect): QueryPromise<GetMyPostsData, undefined>;

interface GetMyPostsRef {
  ...
  (dc: DataConnect): QueryRef<GetMyPostsData, undefined>;
}
export const getMyPostsRef: GetMyPostsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyPostsRef:
```typescript
const name = getMyPostsRef.operationName;
console.log(name);
```

### Variables
The `GetMyPosts` query has no variables.
### Return Type
Recall that executing the `GetMyPosts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyPostsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyPostsData {
  posts: ({
    id: UUIDString;
    content: string;
    createdAt: TimestampString;
  } & Post_Key)[];
}
```
### Using `GetMyPosts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyPosts } from '@dataconnect/generated';


// Call the `getMyPosts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyPosts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyPosts(dataConnect);

console.log(data.posts);

// Or, you can use the `Promise` API.
getMyPosts().then((response) => {
  const data = response.data;
  console.log(data.posts);
});
```

### Using `GetMyPosts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyPostsRef } from '@dataconnect/generated';


// Call the `getMyPostsRef()` function to get a reference to the query.
const ref = getMyPostsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyPostsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.posts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.posts);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@dataconnect/generated';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@dataconnect/generated';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateMyBio
You can execute the `UpdateMyBio` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateMyBio(vars?: UpdateMyBioVariables): MutationPromise<UpdateMyBioData, UpdateMyBioVariables>;

interface UpdateMyBioRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateMyBioVariables): MutationRef<UpdateMyBioData, UpdateMyBioVariables>;
}
export const updateMyBioRef: UpdateMyBioRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateMyBio(dc: DataConnect, vars?: UpdateMyBioVariables): MutationPromise<UpdateMyBioData, UpdateMyBioVariables>;

interface UpdateMyBioRef {
  ...
  (dc: DataConnect, vars?: UpdateMyBioVariables): MutationRef<UpdateMyBioData, UpdateMyBioVariables>;
}
export const updateMyBioRef: UpdateMyBioRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateMyBioRef:
```typescript
const name = updateMyBioRef.operationName;
console.log(name);
```

### Variables
The `UpdateMyBio` mutation has an optional argument of type `UpdateMyBioVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateMyBioVariables {
  bio?: string | null;
}
```
### Return Type
Recall that executing the `UpdateMyBio` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateMyBioData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateMyBioData {
  user_update?: User_Key | null;
}
```
### Using `UpdateMyBio`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateMyBio, UpdateMyBioVariables } from '@dataconnect/generated';

// The `UpdateMyBio` mutation has an optional argument of type `UpdateMyBioVariables`:
const updateMyBioVars: UpdateMyBioVariables = {
  bio: ..., // optional
};

// Call the `updateMyBio()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateMyBio(updateMyBioVars);
// Variables can be defined inline as well.
const { data } = await updateMyBio({ bio: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateMyBioVariables` argument.
const { data } = await updateMyBio();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateMyBio(dataConnect, updateMyBioVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateMyBio(updateMyBioVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateMyBio`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateMyBioRef, UpdateMyBioVariables } from '@dataconnect/generated';

// The `UpdateMyBio` mutation has an optional argument of type `UpdateMyBioVariables`:
const updateMyBioVars: UpdateMyBioVariables = {
  bio: ..., // optional
};

// Call the `updateMyBioRef()` function to get a reference to the mutation.
const ref = updateMyBioRef(updateMyBioVars);
// Variables can be defined inline as well.
const ref = updateMyBioRef({ bio: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateMyBioVariables` argument.
const ref = updateMyBioRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateMyBioRef(dataConnect, updateMyBioVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

