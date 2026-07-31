import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Req } from '@nestjs/common';

import { NATS_SERVICES } from '../config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, of } from 'rxjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { CurrentUser } from './interfaces/current-user.inmterface';
import { Token } from './decorators/token.decorator';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICES) private readonly client: ClientProxy
  ) { }

  @Post('register')
  registerUser(@Body() registerDto: RegisterDto) {
    return this.client.send({ cmd: 'auth.register.user' }, registerDto).pipe(
      catchError(error => {
        throw new RpcException(error)
      })
    )
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.client.send({ cmd: 'auth.login.user' }, loginDto).pipe(
      catchError(error => {
        throw new RpcException(error)
      })
    )
  }


  @UseGuards(AuthGuard)
  @Get('verify')
  verifyUser(@User() user: CurrentUser, @Token() token: string) {


    return {
      user,
      token
    }
    // return this.client.send({ cmd: 'auth.verify.user' }, {}).pipe(
    //   catchError(error => {
    //     throw new RpcException(error)
    //   })
    // )
  }


}
