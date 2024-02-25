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
      habits: {
        Row: {
          amount: number
          created_at: string | null
          days: number[] | null
          end_date: string | null
          frequency: Database["public"]["Enums"]["frequencytype"]
          icon: string
          id: string
          interval: number
          name: string
          projectId: string
          reminders: number[] | null
          repeatType: Database["public"]["Enums"]["repeatType"]
          start_date: string
          updated_at: string | null
          userId: string | null
          week_days: number[] | null
        }
        Insert: {
          amount?: number
          created_at?: string | null
          days?: number[] | null
          end_date?: string | null
          frequency?: Database["public"]["Enums"]["frequencytype"]
          icon: string
          id?: string
          interval?: number
          name: string
          projectId: string
          reminders?: number[] | null
          repeatType?: Database["public"]["Enums"]["repeatType"]
          start_date?: string
          updated_at?: string | null
          userId?: string | null
          week_days?: number[] | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          days?: number[] | null
          end_date?: string | null
          frequency?: Database["public"]["Enums"]["frequencytype"]
          icon?: string
          id?: string
          interval?: number
          name?: string
          projectId?: string
          reminders?: number[] | null
          repeatType?: Database["public"]["Enums"]["repeatType"]
          start_date?: string
          updated_at?: string | null
          userId?: string | null
          week_days?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "Habit_projectId_fkey"
            columns: ["projectId"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Habit_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
          }
        ]
      }
      projects: {
        Row: {
          color: Database["public"]["Enums"]["colortype"]
          id: string
          name: string
          order: number
          userId: string | null
        }
        Insert: {
          color: Database["public"]["Enums"]["colortype"]
          id?: string
          name: string
          order?: number
          userId?: string | null
        }
        Update: {
          color?: Database["public"]["Enums"]["colortype"]
          id?: string
          name?: string
          order?: number
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Project_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      colortype:
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
      frequencytype: "daily" | "monthly" | "interval"
      FrequencyType: "per day" | "per week" | "per month"
      partOfDay: "morning" | "afternoon" | "evening" | "any time"
      repeatType: "times" | "mins"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
