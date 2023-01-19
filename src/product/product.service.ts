import { Injectable, NotFoundException } from '@nestjs/common';
import { ignoreElements } from 'rxjs';
import { Product } from './product.model';

@Injectable()
export class ProductService {

    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getAllProducts() {
        return [...this.products];
    }

    getProductById(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }


    updateProductById(productId: string, prodTitle: string, prodDescription: string, prodPrice: number) {
        const [product, index]= this.findProduct(productId);
        const updatedProduct = {...product};
      
        if(prodTitle){
            updatedProduct.title = prodTitle;
        }
        if(prodDescription){
            updatedProduct.description = prodDescription;
        }
        if(prodPrice){
            updatedProduct.price = prodPrice;
        }
        this.products[index] = updatedProduct;
    }

    deleteProductById(productId: string) {
        const  index = this.findProduct(productId)[1];
        this.products.splice(index, 1);
        //return { ...product };
    }

    private findProduct(productId: string): [Product, number]{
        const productIndex = this.products.findIndex((prod) => prod.id === productId);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('product does not exist');
        }
        return [product, productIndex];
    }
}
