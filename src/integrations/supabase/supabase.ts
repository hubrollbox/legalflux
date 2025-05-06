import { createClient } from '@supabase/supabase-js';

// Using fixed values since environment variables are causing issues
const supabaseUrl = 'https://iibvdqcwycrcyskxvsgu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpYnZkcWN3eWNyY3lza3h2c2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MzQ4MzEsImV4cCI6MjA1ODAxMDgzMX0.KZfIOLYclaOtn3WX_za7ti3Q0qgz06CtU5wjkV8IasU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);