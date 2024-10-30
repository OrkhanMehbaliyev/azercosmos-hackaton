const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://kwpqcfbhaiajqocqhklk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3cHFjZmJoYWlhanFvY3Foa2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxMzI2MjAsImV4cCI6MjA0MzcwODYyMH0.Ccw0Dh74vjo6vnuxTHm1szC6XwX5XM_X0i8EuBIMGTs";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
