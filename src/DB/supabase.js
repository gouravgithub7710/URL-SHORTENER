import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase

//this line new
export const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5173'

