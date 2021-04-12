import {Component, OnInit} from '@angular/core';
import {LivroModel} from "../livro.model";
import {ActivatedRoute, Router} from "@angular/router";
import {LivroService} from "../livro.service";
import {Location} from "@angular/common";

@Component({
    selector: 'app-livro-read',
    templateUrl: './livro-read.component.html',
    styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

    livro: LivroModel = {
        nomeAutor: '',
        texto: '',
        titulo: ''
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private livroService: LivroService,
        private _locate: Location
    ) {
    }

    ngOnInit(): void {
        if (this.route.snapshot.paramMap.get('id')) {
            this.livroService.findById(this.route.snapshot.paramMap.get('id')!).subscribe((data) => {
                this.livro = data
            })
        } else {
            this.livroService.message('Selecione um livro para ler.')
            this.cancel()
        }
    }

    cancel = () => {
        this._locate.back()
    }

}
