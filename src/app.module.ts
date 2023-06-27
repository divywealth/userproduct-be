import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { UserproductModule } from './userproduct/userproduct.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { Product } from './product/entities/product.entity';
import { Userproduct } from './userproduct/entities/userproduct.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: ['./env/.env.production','./env/.production.env' ]
      envFilePath: `./env/.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      entities: [
        User,
        Product,
        Userproduct,
      ],
      synchronize: false
    }),
    AuthenticationModule, 
    UserModule, 
    ProductModule, 
    UserproductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
