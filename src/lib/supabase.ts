import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fzttyvlmcqbajeanedpy.supabase.co';
const supabaseKey = 'sb_publishable_fX19fG2iTZmDLuO9fQ8g7Q_zuHONDTW';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
