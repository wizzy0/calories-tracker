import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bknseifmmorbqahgapgi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrbnNlaWZtbW9yYnFhaGdhcGdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjIwOTIsImV4cCI6MjA2MTQ5ODA5Mn0._lZBD-qVM0By6ScGTglA-fKE1rBtfQrr7dyFO5rdslg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 