import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/views/home/home.component";
import {CategoriaReadComponent} from "./components/views/categoria/categoria-read/categoria-read.component";
import {CategoriaCreateComponent} from "./components/views/categoria/categoria-create/categoria-create.component";
import {CategoriaDeleteComponent} from "./components/views/categoria/categoria-delete/categoria-delete.component";
import {CategoriaUpdateComponent} from "./components/views/categoria/categoria-update/categoria-update.component";
import {LivroReadAllComponent} from "./components/views/livro/livro-read-all/livro-read-all.component";
import {LivroCreateComponent} from "./components/views/livro/livro-create/livro-create.component";
import {LivroUpdateComponent} from "./components/views/livro/livro-update/livro-update.component";
import {LivroDeleteComponent} from "./components/views/livro/livro-delete/livro-delete.component";
import {LivroReadComponent} from "./components/views/livro/livro-read/livro-read.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'categorias',
        component: CategoriaReadComponent
    },
    {
        path: 'categorias/create',
        component: CategoriaCreateComponent
    },
    {
        path: 'categorias/delete',
        component: CategoriaDeleteComponent
    },
    {
        path: 'categorias/update',
        component: CategoriaUpdateComponent
    },
    {
        path: 'categorias/:id/livros',
        component: LivroReadAllComponent
    },
    {
        path: 'categorias/:id/livros/create',
        component: LivroCreateComponent
    },
    {
        path: 'categorias/:id/livros/:id/read',
        component: LivroReadComponent
    },
    {
        path: 'livros/update',
        component: LivroUpdateComponent
    },
    {
        path: 'livros/delete',
        component: LivroDeleteComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
