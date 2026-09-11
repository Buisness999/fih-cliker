const { SlashCommandBuilder } = require("discord.js");
const { getOrCreatePlayer } = require("../database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("balance")
        .setDescription("Check your Fih balance 🐟"),

    async execute(interaction) {
        try {
            const player = await getOrCreatePlayer(interaction.user);

            await interaction.reply(
                `🐟 **${interaction.user.username}'s Fih Stats**\n\n` +
                `💰 Fih Coins: **${Number(player.fih_coins).toLocaleString()}**\n` +
                `✨ Golden Fih: **${Number(player.golden_fih).toLocaleString()}**\n` +
                `🖱️ Total Clicks: **${Number(player.total_clicks).toLocaleString()}**`
            );
        } catch (error) {
            console.error(error);

            await interaction.reply({
                content: "❌ Couldn't load your stats.",
                ephemeral: true
            });
        }
    }
};
