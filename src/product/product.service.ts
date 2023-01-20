import { Injectable, NotFoundException } from '@nestjs/common';
import { ignoreElements } from 'rxjs';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { title } from 'process';

@Injectable()
export class ProductService {

    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({ title: title, description: desc, price: price });
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }

    async getAllProducts() {
        const products = await this.productModel.find().exec();
        return products.map(prod=> ({id: prod.id, title: prod.title, descrption: prod.description, price: prod.price})); 
    }

    async getProductById(productId: string) {
        const product = await (await this.findProduct(productId));
        return product;
    }


    updateProductById(productId: string, prodTitle: string, prodDescription: string, prodPrice: number) {
        // const [product, index] = this.findProduct(productId);
        // const updatedProduct = { ...product };

        // if (prodTitle) {
        //     updatedProduct.title = prodTitle;
        // }
        // if (prodDescription) {
        //     updatedProduct.description = prodDescription;
        // }
        // if (prodPrice) {
        //     updatedProduct.price = prodPrice;
        // }
        // this.products[index] = updatedProduct;
    }

    deleteProductById(productId: string) {
        const index = this.findProduct(productId)[1];
        this.products.splice(index, 1);
        //return { ...product };
    }

    private async  findProduct(productId: string): Promise<Product> {
        const product =await  this.productModel.findById(productId)
        if (!product) {
            throw new NotFoundException('product does not exist');
        }
        return {id: product.id, title: product.title, description: product.description, price: product.price};
    }
}
