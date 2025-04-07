
// This file extends the generated Supabase types with our new tables
import { createClient } from '@supabase/supabase-js';
import { Database as GeneratedDatabase } from './types';

// Extend the Database type with our custom tables
export interface Database extends GeneratedDatabase {
  public: {
    Tables: GeneratedDatabase['public']['Tables'] & {
      profiles: {
        Row: {
          id: string;
          created_at: string | null;
          updated_at: string | null;
          full_name: string;
          email: string;
          phone_number: string | null;
          bio: string | null;
          avatar_url: string | null;
          fitness_level: string | null;
          goals: string[] | null;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          updated_at?: string | null;
          full_name: string;
          email: string;
          phone_number?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          fitness_level?: string | null;
          goals?: string[] | null;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          updated_at?: string | null;
          full_name?: string;
          email?: string;
          phone_number?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          fitness_level?: string | null;
          goals?: string[] | null;
        };
      };
      workout_categories: {
        Row: {
          id: string;
          created_at: string | null;
          name: string;
        };
        Insert: {
          id?: string;
          created_at?: string | null;
          name: string;
        };
        Update: {
          id?: string;
          created_at?: string | null;
          name?: string;
        };
      };
      user_workouts: {
        Row: {
          id: string;
          user_id: string;
          category_id: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string;
          created_at?: string | null;
        };
      };
      community_posts: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          created_at: string | null;
          likes: number | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          created_at?: string | null;
          likes?: number | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          created_at?: string | null;
          likes?: number | null;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          post_id?: string;
          user_id?: string;
          content?: string;
          created_at?: string | null;
        };
      };
    };
    Views: GeneratedDatabase['public']['Views'];
    Functions: GeneratedDatabase['public']['Functions'];
    Enums: GeneratedDatabase['public']['Enums'];
    CompositeTypes: GeneratedDatabase['public']['CompositeTypes'];
  };
}

// Create a custom typed supabase client
export type TypedSupabaseClient = ReturnType<typeof createClient<Database>>;
