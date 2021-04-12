import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LivroService} from "../livro.service";
import {LivroModel} from "../livro.model";
import {Location} from "@angular/common";

@Component({
    selector: 'app-livro-delete',
    templateUrl: './livro-delete.component.html',
    styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

    livro: LivroModel = {nomeAutor: '', texto: '', titulo: '', id: ''};

    constructor(
        private router: Router,
        private livroService: LivroService,
        private _location: Location
    ) {
        const nav = this.router.getCurrentNavigation();

        this.livro = nav?.extras?.state?.livro;
    }

    ngOnInit(): void {
        if (!this.livro) {
            this.livroService.message('Nenhum livro selecionado !')
            this.cancel()
        }
    }

    cancel() {
        this._location.back();
    }

    save() {
        if (this.livro.id)
            this.livroService.delete(this.livro.id!).subscribe(
                () => {
                    this.livroService.message(`Livro ${this.livro.titulo} apagado!`)
                    this.cancel()
                }, err => {
                    // this.livroService.message(err.error.error)
                }
            )
    }
}
