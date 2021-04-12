import {Component, OnInit} from '@angular/core';
import {CategoriaModel} from "../categoria.model";
import {Router} from "@angular/router";
import {CategoriaService} from "../categoria.service";

@Component({
    selector: 'app-categoria-delete',
    templateUrl: './categoria-delete.component.html',
    styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

    categoria: CategoriaModel = {
        descricao: '',
        nome: ''
    }

    constructor(
        private router: Router,
        private categoriaService: CategoriaService
    ) {

        const nav = this.router.getCurrentNavigation();

        this.categoria = nav?.extras?.state?.categoria;
    }

    ngOnInit(): void {
        if (!this.categoria) {
            this.categoriaService.message('Nenhuma categoria selecionada !')
            this.router.navigateByUrl('/categorias');
        }
    }

    deletar = (): void => {
        if (this.categoria.id)
            this.categoriaService.delete(this.categoria.id).subscribe(() => {
                this.categoriaService.message(`Categoria ${this.categoria.nome} deletada com sucesso!`)
                this.cancel()
            }, err => {
                this.categoriaService.message(err.error.error)
            })
    }

    cancel = (): void => {
        this.router.navigateByUrl('/categorias')
    }
}
