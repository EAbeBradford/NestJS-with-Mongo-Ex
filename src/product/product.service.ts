import { Injectable, NotFoundException } from '@nestjs/common';
import { ignoreElements } from 'rxjs';
import { Product } from './product.model';

@Injectable()
export class ProductService {

    private products:Product[] = [];

    insertProduct(title:string, desc:string, price: number){
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getAllProducts(){
        return [...this.products];
    }

    getProductById(productId: string){
        const product = this.products.find((prod)=> prod.id ===productId);
        if(!product){
            throw new NotFoundException('product does not exist');
        }
        return {... product};
    }

}
