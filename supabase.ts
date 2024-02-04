export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Habit: {
        Row: {
          created_at: string | null;
          days: number[] | null;
          end_date: string | null;
          frequencyType: Database["public"]["Enums"]["frequencytype"] | null;
          icon: string | null;
          id: string;
          interval: number | null;
          name: string | null;
          projectId: string | null;
          reminders: number[] | null;
          start_date: string | null;
          updated_at: string | null;
          week_days: number[] | null;
        };
        Insert: {
          created_at?: string | null;
          days?: number[] | null;
          end_date?: string | null;
          frequencyType?: Database["public"]["Enums"]["frequencytype"] | null;
          icon?: string | null;
          id?: string;
          interval?: number | null;
          name?: string | null;
          projectId?: string | null;
          reminders?: number[] | null;
          start_date?: string | null;
          updated_at?: string | null;
          week_days?: number[] | null;
        };
        Update: {
          created_at?: string | null;
          days?: number[] | null;
          end_date?: string | null;
          frequencyType?: Database["public"]["Enums"]["frequencytype"] | null;
          icon?: string | null;
          id?: string;
          interval?: number | null;
          name?: string | null;
          projectId?: string | null;
          reminders?: number[] | null;
          start_date?: string | null;
          updated_at?: string | null;
          week_days?: number[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "Habit_projectId_fkey";
            columns: ["projectId"];
            isOneToOne: false;
            referencedRelation: "Project";
            referencedColumns: ["id"];
          }
        ];
      };
      Project: {
        Row: {
          color: Database["public"]["Enums"]["colortype"];
          id: string;
          name: string;
        };
        Insert: {
          color: Database["public"]["Enums"]["colortype"];
          id?: string;
          name: string;
        };
        Update: {
          color?: Database["public"]["Enums"]["colortype"];
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
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
        | "orange";
      frequencytype: "daily" | "monthly" | "interval";
      FrequencyType: "daily" | "monthly" | "interval";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

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
  : never;
