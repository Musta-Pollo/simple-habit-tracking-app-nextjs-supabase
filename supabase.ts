export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      completions: {
        Row: {
          day: string
          habit_id: string
          id: string
          user_id: string
        }
        Insert: {
          day: string
          habit_id: string
          id?: string
          user_id: string
        }
        Update: {
          day?: string
          habit_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "completions_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          amount: number
          color_hexa: string
          created_at: string | null
          days: number[] | null
          end_date: string | null
          friday: boolean
          icon: string | null
          id: string
          interval: number | null
          monday: boolean
          name: string | null
          part_of_day: Database["public"]["Enums"]["part_of_day"]
          projectid: string
          reminders: number[] | null
          saturday: boolean
          start_date: string | null
          sunday: boolean
          thursday: boolean
          tuesday: boolean
          updated_at: string | null
          userid: string
          wednesday: boolean
          week_days: number[] | null
        }
        Insert: {
          amount: number
          color_hexa: string
          created_at?: string | null
          days?: number[] | null
          end_date?: string | null
          friday: boolean
          icon?: string | null
          id?: string
          interval?: number | null
          monday: boolean
          name?: string | null
          part_of_day: Database["public"]["Enums"]["part_of_day"]
          projectid: string
          reminders?: number[] | null
          saturday: boolean
          start_date?: string | null
          sunday: boolean
          thursday: boolean
          tuesday: boolean
          updated_at?: string | null
          userid: string
          wednesday: boolean
          week_days?: number[] | null
        }
        Update: {
          amount?: number
          color_hexa?: string
          created_at?: string | null
          days?: number[] | null
          end_date?: string | null
          friday?: boolean
          icon?: string | null
          id?: string
          interval?: number | null
          monday?: boolean
          name?: string | null
          part_of_day?: Database["public"]["Enums"]["part_of_day"]
          projectid?: string
          reminders?: number[] | null
          saturday?: boolean
          start_date?: string | null
          sunday?: boolean
          thursday?: boolean
          tuesday?: boolean
          updated_at?: string | null
          userid?: string
          wednesday?: boolean
          week_days?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "habits_projectid_fkey"
            columns: ["projectid"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "habits_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          color_hexa: string
          icon: string
          id: string
          name: string
          order: number
          userid: string
        }
        Insert: {
          color_hexa: string
          icon: string
          id?: string
          name: string
          order: number
          userid: string
        }
        Update: {
          color_hexa?: string
          icon?: string
          id?: string
          name?: string
          order?: number
          userid?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      color_type:
        | "red"
        | "blue"
        | "green"
        | "yellow"
        | "purple"
        | "pink"
        | "indigo"
        | "teal"
        | "cyan"
        | "orange"
      frequency_type: "daily" | "monthly" | "interval"
      part_of_day: "Any Time" | "Morning" | "Afternoon" | "Evening"
      repeat_type: "Times" | "Mins" | "Monthly"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
