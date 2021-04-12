import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CategoriaService} from "../categoria.service";
import {CategoriaModel} from "../categoria.model";

@Component({
    selector: 'app-categoria-update',
    templateUrl: './categoria-update.component.html',
    styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

    categoria: CategoriaModel = {
        descricao: '',
        nome: ''
    }

    constructor(private router: Router, private categoriaService: CategoriaService,) {

        const nav = this.router.getCurrentNavigation();

        this.categoria = nav?.extras?.state?.categoria;
    }

    ngOnInit(): void {
        if (!this.categoria) {
            this.categoriaService.message('Nenhuma categoria selecionada !')
            this.router.navigateByUrl('/categorias');
        }
    }

    update = (): void => {
        let erros: string = '';
        this.categoriaService.update(this.categoria).subscribe(() => {

                this.categoriaService.message(`Categoria atualizada para ${this.categoria.nome}`)
                this.cancel();
            },
            err => {
                for (let i = 0; i < err.error.errors.length; i++) {
                    erros += `${err.error.errors[i].message}`;
                }
                this.categoriaService.message(erros)
            })
    }

    cancel = (): void => {
        this.router.navigateByUrl('/categorias')
    }
}
