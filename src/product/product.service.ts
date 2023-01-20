import { Injectable, NotFoundException } from '@nestjs/common';
import { ignoreElements } from 'rxjs';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { title } from 'process';

@Injectable()
export class ProductService {


    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({ title: title, description: desc, price: price });
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }

    async getAllProducts() {
        const products = await this.productModel.find().exec();
        return products.map(prod => ({ id: prod.id, title: prod.title, descrption: prod.description, price: prod.price }));
    }

    async getProductById(productId: string) {
        const product = await (await this.findProduct(productId));
        return { id: product.id, title: product.title, description: product.description, price: product.price };
    }


    async updateProductById(productId: string, prodTitle: string, prodDescription: string, prodPrice: number) {
        const updatedProduct = await this.findProduct(productId);

        if (prodTitle) {
            updatedProduct.title = prodTitle;
        }
        if (prodDescription) {
            updatedProduct.description = prodDescription;
        }
        if (prodPrice) {
            updatedProduct.price = prodPrice;
        }
        updatedProduct.save();
        // this.products[index] = updatedProduct;
    }

    async deleteProductById(productId: string) {
        const result = await this.productModel.deleteOne({ _id: productId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('product does not exist');
        }

        console.log(result);
    }

    private async findProduct(productId: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(productId)

        } catch (error) {
            throw new NotFoundException('product does not exist');

        }
        if (!product) {
            throw new NotFoundException('product does not exist');
        }
        return product;
    }
}
