import { Module } from '@nestjs/common';
import { UserproductService } from './userproduct.service';
import { UserproductController } from './userproduct.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userproduct } from './entities/userproduct.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Userproduct, User, Product]),
    JwtModule.register({
      secret: 'yeatel',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserproductController],
  providers: [UserproductService, UserService, ProductService]
})
export class UserproductModule {}
