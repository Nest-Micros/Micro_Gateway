import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NATS_SERVICES, ORDERS_SERVICE } from '../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, of } from 'rxjs';
import { ChangeOrderStatusDto } from './dto/status.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICES) private readonly client: ClientProxy,
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send({ cmd: 'create-order' }, createOrderDto).pipe(
      catchError(error => {
        // throw new RpcException(error as object | string)
        console.log('Error creating order', error);
        return of(null);
      })
    );
  }


  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.client.send({ cmd: 'find-all-orders' }, {}).pipe(
      catchError(error => {
        throw new RpcException(error as object | string)
      })
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find-one-order' }, id).pipe(
      catchError(error => {
        throw new RpcException(error as object | string)
      })
    );
  }



  @Patch('change-order-status/:id')
  changeOrderStatus(
    @Param('id') id: string,
    @Body() changeOrderStatusDto: ChangeOrderStatusDto) {
    return this.client.send(
      { cmd: 'change-order-status' },
      { id, status: changeOrderStatusDto.status },
    ).pipe(
      catchError(error => {
        throw new RpcException(error as object | string)
      })
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send({ cmd: 'delete-order' }, id).pipe(
      catchError(error => {
        throw new RpcException(error as object | string)
      })
    );
  }

}
