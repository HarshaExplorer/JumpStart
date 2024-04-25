import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_DATABASE_URL;
const supabaseKey = process.env.REACT_APP_DATABASE_KEY;

console.log(`supabaseURL: ${supabaseUrl}`);
const database = createClient(supabaseUrl, supabaseKey);

export default database;

