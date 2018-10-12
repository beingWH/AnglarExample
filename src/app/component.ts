import {ApplicationRef, Component} from '@angular/core';
import {Model} from './repository.model';
import {Product} from './product.model';
import {NgForm} from '@angular/forms';
import {ProductFormGroup} from './form.model';


@Component({
  selector: 'app',
  templateUrl: 'template2.html'
})
export class ProductComponent {
  model: Model = new Model();
  counter: number = 1;
  formSubmitted: boolean = false;
  form:ProductFormGroup=new ProductFormGroup();
  showTable:boolean=true;

  constructor(ref: ApplicationRef) {
    (<any>window).appRef = ref;
    (<any>window).model = this.model;
  }

  get nextProduct(): Product {
    return this.model.getProducts().shift();
  }

  getKey(index: number, product: Product) {
    return product.id;
  }

  getClasses(): string {
    return this.model.getProducts().length == 5 ? 'bg-success' : 'bg-warning';
  }

  getProduct(key: number): Product {
    return this.model.getProduct(key);
  }

  getProducts(): Product[] {
    return this.model.getProducts();
  }

  getProductCount(): number {
    return this.getProducts().length;
  }

  targeName: string = 'Kayak';

  selectedProduct: string;

  getSelected(product: Product): boolean {
    return product.name == this.selectedProduct;
  }

  newProduct: Product = new Product();

  get jsonProduct() {
    return JSON.stringify(this.newProduct);
  }

  addProduct(p: Product) {
    this.model.saveProduct(p);
  }

  getValidationMessagesX(state: any, thingName?: string) {
    let thing: string = state.path || thingName;
    let messages: string[] = [];
    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case 'required':
            messages.push(`You must enter a ${thing}`);
            break;
          case 'minlength':
            messages.push(`A ${thing} must be at least ${state.errors['minlength'].requiredLength} characters`);
            break;
          case 'pattern':
            messages.push(`The ${thing} contains illegal characters`);
            break;
        }
      }
    }
    return messages;
  }

  getFormValidationMessagesX(form: NgForm): string[] {
    const messages: string[] = [];
    Object.keys(form.controls).forEach(k => {
      this.getValidationMessagesX(form.controls[k], k).forEach(m => messages.push(m));
    });
    return messages;
  }

  submitForm(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      this.addProduct(this.newProduct);
      this.newProduct = new Product();
      form.reset();
      this.formSubmitted = false;
    }
  }


}
