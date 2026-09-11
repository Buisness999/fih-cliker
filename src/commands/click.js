const { SlashCommandBuilder } = require("discord.js");
const { getOrCreatePlayer, updatePlayer } = require("../database");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("click")
        .setDescription("Click the fih! 🐟"),

    async execute(interaction) {
        try {
            const player = await getOrCreatePlayer(interaction.user);

            const earned = 1;

            const newCoins = Number(player.fih_coins) + earned;
            const newClicks = Number(player.total_clicks) + 1;

            await updatePlayer(interaction.user.id, {
                fih_coins: newCoins,
                total_clicks: newClicks,
                username: interaction.user.username
            });

            await interaction.reply(
                `🐟 **Fih!** You earned **${earned} Fih Coin**!\n` +
                `💰 Balance: **${newCoins.toLocaleString()}**`
            );
        } catch (error) {
            console.error(error);

            await interaction.reply({
                content: "❌ Something went wrong while clicking the fih.",
                ephemeral: true
            });
        }
    }
};
