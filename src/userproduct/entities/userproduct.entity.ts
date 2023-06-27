import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';

@Entity()
export class Userproduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userProduct, { onDelete: 'CASCADE' })
  public user: User;

  @ManyToOne(() => Product, (product) => product.userProduct, {
    onDelete: 'CASCADE',
  })
  public product: Product;

}

