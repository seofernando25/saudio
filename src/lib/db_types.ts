/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Downloads = "downloads",
	Songs = "songs",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type DownloadsRecord = {
	blob?: string
	url?: string
}

export type SongsRecord = {
	album?: string
	art?: string
	artist?: string
	name?: string
	url?: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type DownloadsResponse<Texpand = unknown> = Required<DownloadsRecord> & BaseSystemFields<Texpand>
export type SongsResponse<Texpand = unknown> = Required<SongsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	downloads: DownloadsRecord
	songs: SongsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	downloads: DownloadsResponse
	songs: SongsResponse
	users: UsersResponse
}