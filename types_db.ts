export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Channel: {
        Row: {
          createAT: string
          id: string
          name: string
          profileId: string
          serverId: string
          type: Database["public"]["Enums"]["ChannelType"]
          updatedAt: string
        }
        Insert: {
          createAT?: string
          id: string
          name: string
          profileId: string
          serverId: string
          type?: Database["public"]["Enums"]["ChannelType"]
          updatedAt: string
        }
        Update: {
          createAT?: string
          id?: string
          name?: string
          profileId?: string
          serverId?: string
          type?: Database["public"]["Enums"]["ChannelType"]
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Channel_profileId_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Channel_serverId_fkey"
            columns: ["serverId"]
            isOneToOne: false
            referencedRelation: "Server"
            referencedColumns: ["id"]
          }
        ]
      }
      Member: {
        Row: {
          createAT: string
          id: string
          profileId: string
          role: Database["public"]["Enums"]["MemberRole"]
          serverId: string
          updatedAt: string
        }
        Insert: {
          createAT?: string
          id: string
          profileId: string
          role?: Database["public"]["Enums"]["MemberRole"]
          serverId: string
          updatedAt: string
        }
        Update: {
          createAT?: string
          id?: string
          profileId?: string
          role?: Database["public"]["Enums"]["MemberRole"]
          serverId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Member_profileId_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "Profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Member_serverId_fkey"
            columns: ["serverId"]
            isOneToOne: false
            referencedRelation: "Server"
            referencedColumns: ["id"]
          }
        ]
      }
      Profile: {
        Row: {
          createdAt: string
          email: string
          id: string
          imageUrl: string
          name: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          email: string
          id: string
          imageUrl: string
          name: string
          updatedAt?: string
          userId: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
          imageUrl?: string
          name?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: []
      }
      Server: {
        Row: {
          createdAt: string
          id: string
          imageUrl: string
          inviteCode: string
          name: string
          profileId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          imageUrl: string
          inviteCode: string
          name: string
          profileId: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          imageUrl?: string
          inviteCode?: string
          name?: string
          profileId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Server_profileId_fkey"
            columns: ["profileId"]
            isOneToOne: false
            referencedRelation: "Profile"
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
      ChannelType: "TEXT" | "AUDIO" | "VIDEO"
      MemberRole: "ADMIN" | "MODERATOR" | "GUEST"
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
