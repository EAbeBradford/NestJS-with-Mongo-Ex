import { Injectable, NotFoundException } from '@nestjs/common';
import { ignoreElements } from 'rxjs';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
        return products as Product[];
    }

    getProductById(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }


    updateProductById(productId: string, prodTitle: string, prodDescription: string, prodPrice: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };

        if (prodTitle) {
            updatedProduct.title = prodTitle;
        }
        if (prodDescription) {
            updatedProduct.description = prodDescription;
        }
        if (prodPrice) {
            updatedProduct.price = prodPrice;
        }
        this.products[index] = updatedProduct;
    }

    deleteProductById(productId: string) {
        const index = this.findProduct(productId)[1];
        this.products.splice(index, 1);
        //return { ...product };
    }

    private findProduct(productId: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === productId);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('product does not exist');
        }
        return [product, productIndex];
    }
}
