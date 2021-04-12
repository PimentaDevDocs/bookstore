import {Component, OnInit} from '@angular/core';
import {CategoriaService} from "../categoria.service";
import {CategoriaModel} from "../categoria.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-categoria-create',
    templateUrl: './categoria-create.component.html',
    styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

    categoria: CategoriaModel = {
        descricao: '',
        nome: ''
    }

    constructor(private categoriaService: CategoriaService, private router: Router) {
    }

    ngOnInit(): void {
    }

    create = (): void => {
        let erros: string = '';
        this.categoriaService.create(this.categoria).subscribe(() => {
                this.categoriaService.message('Categoria criada com sucesso !')
                setTimeout(() => {
                    this.cancel()
                }, 500)
            }, err => {
                for (let i = 0; i < err.error.errors.length; i++) {
                    erros += `${err.error.errors[i].message}`;
                }
                this.categoriaService.message(erros)
            }
        )
    }

    cancel = (): void => {
        this.router.navigateByUrl('/categorias')
    }

}
