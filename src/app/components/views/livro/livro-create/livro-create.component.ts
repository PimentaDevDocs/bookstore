import {Component, OnInit} from '@angular/core';
import {LivroModel} from "../livro.model";
import {ActivatedRoute, Router} from "@angular/router";
import {LivroService} from "../livro.service";
import {FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
    selector: 'app-livro-create',
    templateUrl: './livro-create.component.html',
    styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

    livro: LivroModel = {titulo: '', nomeAutor: '', texto: ''}

    livroForm = this.fb.group({
        titulo: [this.livro.titulo,
            [
                Validators.minLength(3),
                Validators.maxLength(10),
                Validators.required,
            ]
        ],
        autor: [this.livro.nomeAutor,
            [
                Validators.minLength(3),
                Validators.maxLength(50),
                Validators.required
            ]
        ],
        texto: [this.livro.texto,
            [
                Validators.minLength(3),
                Validators.maxLength(2000000),
                Validators.required
            ]
        ],
    })

    idCat: string = ''

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private livroService: LivroService,
        private _location: Location,
        private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.idCat = this.route.snapshot.paramMap.get('id')!
    }

    getError = (a: ValidationErrors | null) => {
        if (a) {
            if (a.required) {
                return 'Campo obrigatório'
            }
            if (a.minlength) {
                return `Tamamanho do campo não pode ser menor que ${a.minlength.requiredLength}`
            }
            if (a.maxlength) {
                return `Tamamanho do campo não pode ser maior que ${a.maxlength.requiredLength}`
            }
        }
        return false
    }

    create = (): void => {

        this.livroService.create(this.livro, this.idCat).subscribe(() => {
            this.livroService.message(`Livro ${this.livro.titulo} adicionado.`)
            this.cancel()
        }, () => {
            this.livroService.message(`Erro ao criar o livro, tente novamente mais tarde.`)
            this.cancel()
        })
    }

    cancel = (): void => {
        this._location.back()
    }
}
