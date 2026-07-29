import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICES } from '../config/services';
import { envs } from '../config/envs';
import { NatsModule } from '../transports/nats.module';

@Module({
  imports: [
    NatsModule
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
