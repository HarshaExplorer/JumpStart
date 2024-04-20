import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.DATABASE_KEY;

export const database = createClient(supabaseUrl, supabaseKey);

