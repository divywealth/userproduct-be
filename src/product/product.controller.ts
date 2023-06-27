import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UsePipes, ValidationPipe, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/file-upload-dto';
import { Express } from 'express';

@Controller({
  version: '1'
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'some description',
    type: FileUploadDto,
  })
  @Post('product')
  @UsePipes(ValidationPipe)
  async create(@UploadedFile() file: Express.Multer.File, @Body() body) {
    try {
      const createProductDto: CreateProductDto = {
        name: body.name,
        designer: body.designer,
        file: file,
        img: body.img,
        price: body.price,
      };
      return this.productService.create(createProductDto);
    } catch (e) {
      throw e.message;
    }
  }

  @Get('products')
  findAll() {
    try {
      return this.productService.findAll();
    } catch (e) {
      throw e.message;
    }
  }

  @Get('product/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.productService.findOne(+id);
    } catch (e) {
      throw e.message;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
