import {Component, OnInit} from '@angular/core';
import {CategoriaService} from "../categoria.service";
import {CategoriaModel} from "../categoria.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-categoria-read',
    templateUrl: './categoria-read.component.html',
    styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {

    categorias: CategoriaModel[] = []

    displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];

    constructor(private categoriaService: CategoriaService, private router: Router) {
    }

    ngOnInit(): void {
        this.findAll()
    }

    findAll = () => {
        this.categoriaService.findAll().subscribe(data => {
            this.categorias = data
        })
    }

    navegarParaCategoriaCreate = () => {
        this.router.navigateByUrl('categorias/create')
    }

    delete = (categoria: CategoriaModel) => {
        this.router.navigateByUrl('/categorias/delete', {
            state: {categoria: categoria}
        })
    }

    edit = (categoria: CategoriaModel) => {
        this.router.navigateByUrl('/categorias/update', {
            state: {categoria: categoria}
        })
    }
}
