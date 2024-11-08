import { Routes } from "@angular/router";
import { ProductListComponent } from "./features/product-list/product-list.component";

export const PRODUCTS_ROUTES: Routes = [
	{
		path: "list",
    title: 'Liste des produits',
		component: ProductListComponent,
    data: { isAdmin: false }
	},
	{ path: "**", redirectTo: "list" },
];
