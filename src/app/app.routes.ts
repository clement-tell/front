import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import {CartComponent} from "./cart/cart.component";
import {ContactComponent} from "./contact/contact.component";
import {ProductListComponent} from "./products/features/product-list/product-list.component";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  {
    path: "admin",
    component: ProductListComponent,
    data: { isAdmin: true }
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" }
];