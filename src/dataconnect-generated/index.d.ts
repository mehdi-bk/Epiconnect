import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface ConversationParticipant_Key {
  conversationId: UUIDString;
  userId: UUIDString;
  __typename?: 'ConversationParticipant_Key';
}

export interface Conversation_Key {
  id: UUIDString;
  __typename?: 'Conversation_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface GetMyPostsData {
  posts: ({
    id: UUIDString;
    content: string;
    createdAt: TimestampString;
  } & Post_Key)[];
}

export interface ListPublicProjectsData {
  projects: ({
    id: UUIDString;
    title: string;
    description: string;
  } & Project_Key)[];
}

export interface Message_Key {
  id: UUIDString;
  __typename?: 'Message_Key';
}

export interface Post_Key {
  id: UUIDString;
  __typename?: 'Post_Key';
}

export interface Project_Key {
  id: UUIDString;
  __typename?: 'Project_Key';
}

export interface UpdateMyBioData {
  user_update?: User_Key | null;
}

export interface UpdateMyBioVariables {
  bio?: string | null;
}

export interface UserFollow_Key {
  followerId: UUIDString;
  followedId: UUIDString;
  __typename?: 'UserFollow_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface ListPublicProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPublicProjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPublicProjectsData, undefined>;
  operationName: string;
}
export const listPublicProjectsRef: ListPublicProjectsRef;

export function listPublicProjects(): QueryPromise<ListPublicProjectsData, undefined>;
export function listPublicProjects(dc: DataConnect): QueryPromise<ListPublicProjectsData, undefined>;

interface UpdateMyBioRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateMyBioVariables): MutationRef<UpdateMyBioData, UpdateMyBioVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateMyBioVariables): MutationRef<UpdateMyBioData, UpdateMyBioVariables>;
  operationName: string;
}
export const updateMyBioRef: UpdateMyBioRef;

export function updateMyBio(vars?: UpdateMyBioVariables): MutationPromise<UpdateMyBioData, UpdateMyBioVariables>;
export function updateMyBio(dc: DataConnect, vars?: UpdateMyBioVariables): MutationPromise<UpdateMyBioData, UpdateMyBioVariables>;

interface GetMyPostsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyPostsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyPostsData, undefined>;
  operationName: string;
}
export const getMyPostsRef: GetMyPostsRef;

export function getMyPosts(): QueryPromise<GetMyPostsData, undefined>;
export function getMyPosts(dc: DataConnect): QueryPromise<GetMyPostsData, undefined>;

