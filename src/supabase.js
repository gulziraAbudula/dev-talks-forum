import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://lclxtskwksddjnihlhkz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxjbHh0c2t3a3NkZGpuaWhsaGt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTQ4NzQsImV4cCI6MjA2ODg5MDg3NH0.JiZHtv-Cc1VkCd2TvlFCt4x9R-_m3dx42S7TIK0giUo'

export const supabase = createClient(supabaseUrl, supabaseKey);