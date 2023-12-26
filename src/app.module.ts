import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';


@Module({
  imports: [AuthModule, UserModule, TicketsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
