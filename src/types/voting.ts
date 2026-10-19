export type VotingPlace = { department:string; municipality:string; place:string; table:string; address:string; mapsUrl?:string };
export type LookupResponse = { ok:true; data:VotingPlace } | { ok:false; code:'NOT_FOUND'|'INVALID_REQUEST'|'SERVICE_UNAVAILABLE'|'RATE_LIMITED'; message:string };
