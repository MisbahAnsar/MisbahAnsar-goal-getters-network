
import { createClient } from '@supabase/supabase-js';
import { Database } from './types-extension';

const SUPABASE_URL = "https://jlxppevgmzcjfoklpsww.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpseHBwZXZnbXpjamZva2xwc3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3ODk3NjIsImV4cCI6MjA1MDM2NTc2Mn0.owLjkLb8X_hwhXLrpwR-G4J_cevo5ElKixvqJLXeNDA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
