//import { observable } from "@legendapp/state";
//import {
//  configureSyncedSupabase,
//  syncedSupabase,
//} from "@legendapp/state/sync-plugins/supabase";

//const messages$ = observable(
//  syncedSupabase({
//    ,
//    collection: "messages",
//    // Optional:
//    // Select only id and text fields
//    select: (from) => from.select("id,text"),
//    // Filter by the current user
//    filter: (select) => select.eq("user_id", uid),
//    // Don't allow delete
//    actions: ["read", "create", "update"],
//    // Realtime filter by user_id
//    realtime: { filter: `user_id=eq.${uid}` },
//    // Persist data and pending changes locally
//    persist: { name: "messages", retrySync: true },
//    // Sync only diffs
//    changesSince: "last-sync",
//  })
//);
