import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as AWS from 'aws-sdk';
import { format } from 'date-fns';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  private readonly S3_bucket;
  private s3;
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
  ) {
    this.S3_bucket = "cara-shop";
    this.s3 = new AWS.S3({
      accessKeyId: "AKIAQSGKWKHYJLFHO6IZ",
      secretAccessKey: "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",
    });
  }
  async create(createProductDto: CreateProductDto) {
    const bucket = this.S3_bucket;
    const body = createProductDto.file.buffer;
    const contentType = createProductDto.file.mimetype;
    const split = createProductDto.file.originalname.split('.');
    const extention = split.pop();
    const s3Key = format(new Date(), 'yyy-MM-dd-hh-mm-ss');
    const fileName = `file${s3Key}.${extention}`;
    const params = {
      Bucket: bucket!,
      Key: fileName,
      Body: body,
      ACL: 'public-read',
      ContentType: contentType,
      ContentDisposition: 'inline',
    };
    const s3Response = await this.s3.upload(params).promise();
    const save = {
      name: createProductDto.name,
      designer: createProductDto.designer,
      img: s3Response.Location,
      price: createProductDto.price,
    };
    return this.ProductRepository.save(save);
  }

  findAll() {
    try {
      return this.ProductRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const existingProduct = await this.ProductRepository.findOne({
        where: {
          id: id,
        },
      });
      if (existingProduct != null) {
        return existingProduct;
      } else {
        throw new HttpException("Product wasn't found", HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw e;
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
