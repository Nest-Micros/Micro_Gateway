import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto } from 'src/common/dto/create-product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateProductDto } from 'src/common/dto/update-product.dto';
import { PRODUCTS_SERVICE } from 'src/config/services';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsService: ClientProxy,
  ) { }


  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.send({ cmd: 'create-product' }, createProductDto).pipe(
      catchError(error => {
        throw new RpcException(error as object | string)
      })
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.send({ cmd: 'find-all-products' }, paginationDto).pipe(
      catchError(error => {
        throw new RpcException(error as object | string)
      })
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
      return this.productsService.send({ cmd: 'find-product-by-id' }, { id }).pipe(
        catchError(error => {
          throw new RpcException(error as object | string)
        })
      );
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.send({ cmd: 'update-product' }, { id, ...updateProductDto }).pipe(
      catchError(error => {
        throw new RpcException(error as object | string)
      })
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.send({ cmd: 'delete-product' }, { id }).pipe(
      catchError(error => {
        throw new RpcException(error as object | string)
      })
    );
  }




}
