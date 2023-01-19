import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productsService: ProductService) { }


    @Post()
    addProduct(@Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number,): any {

        const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedId };
    }

    @Get()
    getAllProducts(){
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProdyctById(@Param('id') prodId: string,){
        return this.productsService.getProductById(prodId);
    }

}
