import { IMClient } from '../client';
import { IMModule } from '../framework/Module';

import { PermissionsCache } from './cache/Permissions';
import { PremiumCache } from './cache/Premium';
import { CommandsService } from './services/Commands';
import { DatabaseService } from './services/Database';
import { MessagingService } from './services/Messaging';
import { PremiumService } from './services/Premium';
import { RabbitMqService } from './services/RabbitMq';
import { SchedulerService } from './services/Scheduler';

export class FrameworkModule extends IMModule {
	public constructor(client: IMClient) {
		super(client);

		this.registerService(CommandsService);
		this.registerService(DatabaseService);
		this.registerService(MessagingService);
		this.registerService(PremiumService);
		this.registerService(RabbitMqService);
		this.registerService(SchedulerService);

		this.registerCache(PermissionsCache);
		this.registerCache(PremiumCache);
	}
}