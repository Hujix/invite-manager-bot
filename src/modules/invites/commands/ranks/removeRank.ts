import { Message, Role } from 'eris';

import { IMClient } from '../../../../client';
import { Command, Context } from '../../../../framework/commands/Command';
import { RoleResolver } from '../../../../framework/resolvers';
import { LogAction, ranks } from '../../../../sequelize';
import { CommandGroup, InvitesCommand } from '../../../../types';

export default class extends Command {
	public constructor(client: IMClient) {
		super(client, {
			name: InvitesCommand.removeRank,
			aliases: ['remove-rank'],
			args: [
				{
					name: 'rank',
					resolver: RoleResolver
				}
			],
			group: CommandGroup.Ranks,
			guildOnly: true,
			strict: true,
			extraExamples: ['!removeRank @Role', '!removeRank "Role with space"']
		});
	}

	public async action(
		message: Message,
		[role]: [Role],
		flags: {},
		{ guild, t }: Context
	): Promise<any> {
		const rank = await ranks.find({
			where: {
				guildId: role.guild.id,
				roleId: role.id
			}
		});

		if (rank) {
			await rank.destroy();

			this.client.logAction(guild, message, LogAction.removeRank, {
				rankId: rank.id,
				roleId: role.id
			});

			return this.sendReply(
				message,
				t('cmd.removeRank.done', { role: `<@&${role.id}>` })
			);
		} else {
			return this.sendReply(
				message,
				t('cmd.removeRank.rankNotFound', { role: `<@&${role.id}>` })
			);
		}
	}
}