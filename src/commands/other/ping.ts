import { ApplyOptions } from '@sapphire/decorators';
import {
  ApplicationCommandRegistry,
  Command,
  CommandOptions
} from '@sapphire/framework';
import type { CommandInteraction } from 'discord.js';

@ApplyOptions<CommandOptions>({
  name: 'ping',
  description: 'Replies with Pong!'
})
export class PingCommand extends Command {
  public override async chatInputRun(interaction: CommandInteraction) {
    const ping = Date.now() - interaction.createdTimestamp;

    await interaction
      .reply({
        content: 'Gathering Data.....',
        fetchReply: true
      })
      .then(async () => {
        const apiPing = Date.now() - interaction.createdTimestamp;
        return await interaction.editReply(
          `Pong! - Bot Latency ${ping}ms - API Latency is ${apiPing}ms`
        );
      });
  }

  public override registerApplicationCommands(
    registery: ApplicationCommandRegistry
  ): void {
    registery.registerChatInputCommand({
      name: this.name,
      description: this.description
    });
  }
}
