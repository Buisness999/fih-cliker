const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getOrCreatePlayer(user) {
    const { data: existingPlayer, error: fetchError } = await supabase
        .from("players")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (existingPlayer) {
        return existingPlayer;
    }

    if (fetchError && fetchError.code !== "PGRST116") {
        throw fetchError;
    }

    const { data: newPlayer, error: insertError } = await supabase
        .from("players")
        .insert({
            user_id: user.id,
            username: user.username
        })
        .select()
        .single();

    if (insertError) {
        throw insertError;
    }

    return newPlayer;
}

async function updatePlayer(userId, changes) {
    const { data, error } = await supabase
        .from("players")
        .update({
            ...changes,
            updated_at: new Date().toISOString()
        })
        .eq("user_id", userId)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

module.exports = {
    supabase,
    getOrCreatePlayer,
    updatePlayer
};
