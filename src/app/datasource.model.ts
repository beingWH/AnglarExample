import {Product} from './product.model';

export class SimpleDataSource {
  private data: Product[];

  constructor() {
    this.data = new Array<Product>(
      new Product(1, 'Kayak', 'Watersports', 275),
      new Product(2, 'Lifejacket', 'Watersports', 10.0),
      new Product(3, 'Soccer Ball', 'Soccer', 223),
      new Product(4, 'Corner Flags', 'Soccer', 3232),
      new Product(5, 'Thinking Cap', 'Chess', 2222),
    );
  }

  getData(): Product[] {
    return this.data;
  }
}
