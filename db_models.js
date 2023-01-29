const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://qhimjiomvjwnjailkxdy.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getUserByEmailModel(email) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

async function getUserByUsernameModel(username) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

module.exports = { getUserByEmailModel, getUserByUsernameModel };
