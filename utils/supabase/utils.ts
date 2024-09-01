// import { observable } from "@legendapp/state";
// import {
//   configureSyncedSupabase,
//   syncedSupabase,
// } from "@legendapp/state/sync-plugins/supabase";
// import { SupabaseClient } from "@supabase/supabase-js";
// import { v4 as uuidv4 } from "uuid";

// const generateId = () => uuidv4();

// configureSyncedSupabase({
//   generateId,
// });

// const uid = "";

// const habits$ = (supabase: SupabaseClient<Database>) =>
//   observable(
//     syncedSupabase({
//       supabase,
//       collection: "habits",
//       // Optional:

//       // Select only id and text fields
//       select: (from) => from.select("*,habits(count)"),
//       // Filter by the current user
//       filter: (select) => select.eq("userid", uid),
//       // Don't allow delete
//       actions: ["read", "create", "update", "delete"],
//       // Realtime filter by user_id
//       realtime: { filter: `user_id=eq.${uid}` },
//       // Persist data and pending changes locally
//       persist: { name: "habits", retrySync: true },
//       // Sync only diffs
//       changesSince: "last-sync",
//     })
//   );

// function addMessage(text: string) {
//   const id = generateId();

//   // Add keyed by id to the messages$ observable to trigger a create in Supabase
//   habits$["1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"].set({
//     id,
//     text,
//     created_at: null,
//     updated_at: null,
//   });
// }
