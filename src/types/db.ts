import type { Database, Tables, TablesInsert, TablesUpdate } from './database.generated'

// ---------- Row types ----------

export type Profile = Tables<'profiles'>
export type Room = Tables<'rooms'>
export type RoomMember = Tables<'room_members'>
export type Message = Tables<'messages'>
export type InviteCode = Tables<'invite_codes'>

// ---------- Create (Insert) ----------

export type CreateProfile = TablesInsert<'profiles'>
export type CreateRoom = TablesInsert<'rooms'>
export type CreateRoomMember = TablesInsert<'room_members'>
export type CreateMessage = TablesInsert<'messages'>
export type CreateInviteCode = TablesInsert<'invite_codes'>

// ---------- Update ----------

export type UpdateProfile = TablesUpdate<'profiles'>
export type UpdateRoom = TablesUpdate<'rooms'>
export type UpdateRoomMember = TablesUpdate<'room_members'>
export type UpdateMessage = TablesUpdate<'messages'>
export type UpdateInviteCode = TablesUpdate<'invite_codes'>

// ---------- Database ----------

export type { Database }
