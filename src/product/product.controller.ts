import { Controller, Post, Patch, Delete, Body, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productsService: ProductService) { }


    @Post()
    async addProduct(@Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number,) {

        const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedId };
    }

    @Get()
    async getAllProducts() {
        const products = await this.productsService.getAllProducts();
        return products;
    }

    @Get(':id')
    async getProdyctById(@Param('id') prodId: string,) {
        const product  = await this.productsService.getProductById(prodId);
    
        return product;
    }

    @Patch(':id')
    updateProdyctById(@Param('id') prodId: string, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number,) {
        this.productsService.updateProductById(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    deleteProdyctById(@Param('id') prodId: string,) {
        this.productsService.deleteProductById(prodId);
        return null;
}

}
