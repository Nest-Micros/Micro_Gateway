import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICES } from '../config/services';
import { envs } from '../config/envs';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: NATS_SERVICES,
                transport: Transport.NATS,
                options: {
                    servers: envs.natsUrl,
                },
            },
        ]),
    ],

    exports: [
        ClientsModule.register([
            {
                name: NATS_SERVICES,
                transport: Transport.NATS,
                options: {
                    servers: envs.natsUrl,
                },
            },
        ]),
    ]
})
export class NatsModule { }
