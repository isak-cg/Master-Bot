import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import type { Guild } from 'discord.js';
import { trpcNode } from '../trpc';

@ApplyOptions<ListenerOptions>({
  name: 'guildCreate'
})
export class GuildCreateListener extends Listener {
  public override async run(guild: Guild): Promise<void> {
    const owner = await guild.fetchOwner();

    await trpcNode.mutation('user.create', {
      id: owner.id,
      name: owner.user.username
    });

    await trpcNode.mutation('guild.create', {
      id: guild.id,
      name: guild.name,
      ownerId: owner.id
    });
  }
}
