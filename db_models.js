const { createClient } = require("@supabase/supabase-js");
const { v4: uuidv4 } = require("uuid");
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

async function addUserToDBModel(user) {
    try {
        const userInfo = {
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            username: user.username,
            email: user.email,
            id: uuidv4(),
        };
        const { data, error } = await supabase.from("users").insert(userInfo);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

async function addScoreToDBModel(scoreObj) {
    try {
        const newScore = {
            userId: scoreObj.id,
            ...scoreObj,
        };
        delete newScore.id;
        const { data, error } = await supabase.from("scores").insert(newScore);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

async function getAllScoresModel() {
    try {
        const { data, error } = await supabase.from("scores").select("*");
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

async function getUserByIdModel(id) {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", id);
        if (error) throw error;
        return { username: data[0].username, id };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

async function getScoresByIdModel(id) {
    try {
        const { data, error } = await supabase
            .from("scores")
            .select("*")
            .eq("userId", id);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

async function getHighScoreModel(id) {
    try {
        const { data, error } = await supabase
            .from("scores")
            .select("*")
            .eq("userId", id)
            .order("score", { ascending: false })
            .limit(1);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}
async function getLatestScoreModel(id) {
    try {
        const { data, error } = await supabase
            .from("scores")
            .select("*")
            .eq("userId", id)
            .order("date", { ascending: false })
            .limit(1);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

module.exports = {
    getUserByEmailModel,
    getUserByUsernameModel,
    addUserToDBModel,
    addScoreToDBModel,
    getAllScoresModel,
    getUserByIdModel,
    getScoresByIdModel,
    getHighScoreModel,
    getLatestScoreModel,
};
