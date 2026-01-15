import { CreateUserData, ListPublicProjectsData, UpdateMyBioData, UpdateMyBioVariables, GetMyPostsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useListPublicProjects(options?: useDataConnectQueryOptions<ListPublicProjectsData>): UseDataConnectQueryResult<ListPublicProjectsData, undefined>;
export function useListPublicProjects(dc: DataConnect, options?: useDataConnectQueryOptions<ListPublicProjectsData>): UseDataConnectQueryResult<ListPublicProjectsData, undefined>;

export function useUpdateMyBio(options?: useDataConnectMutationOptions<UpdateMyBioData, FirebaseError, UpdateMyBioVariables | void>): UseDataConnectMutationResult<UpdateMyBioData, UpdateMyBioVariables>;
export function useUpdateMyBio(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateMyBioData, FirebaseError, UpdateMyBioVariables | void>): UseDataConnectMutationResult<UpdateMyBioData, UpdateMyBioVariables>;

export function useGetMyPosts(options?: useDataConnectQueryOptions<GetMyPostsData>): UseDataConnectQueryResult<GetMyPostsData, undefined>;
export function useGetMyPosts(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyPostsData>): UseDataConnectQueryResult<GetMyPostsData, undefined>;
