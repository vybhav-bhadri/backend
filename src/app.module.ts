import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { FolderModule } from './folder/folder.module';
import { RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { isAuthenticated } from './app.middleware';
import { FolderController } from './folder/folder.controller';
import { UserController } from './user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { AuthService } from './service/auth-user.service';
import { AuthUserController } from './controller/auth-user.controller';

@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
    JwtModule.register({
      secret:secret,
      signOptions: { expiresIn: '60' },
    }),
    FolderModule],
  controllers: [AppController,AuthUserController],
  providers: [AppService,AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude({ path: '/auth/signin', method: RequestMethod.POST })
      .forRoutes(UserController);
  }
}
