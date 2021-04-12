import {Component, OnInit} from '@angular/core';
import {LivroModel} from "../livro.model";
import {FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LivroService} from "../livro.service";
import {Location} from "@angular/common";

@Component({
    selector: 'app-livro-update',
    templateUrl: './livro-update.component.html',
    styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

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

    constructor(
        private router: Router,
        private livroService: LivroService,
        private _location: Location,
        private fb: FormBuilder
    ) {
        const nav = this.router.getCurrentNavigation();

        this.livro = nav?.extras?.state?.livro;
    }

    ngOnInit(): void {
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

    save = (): void => {

        this.livroService.update(this.livro).subscribe(() => {
            this.livroService.message(`Livro ${this.livro.titulo} alterado.`)
            this.cancel()
        }, () => {
            this.livroService.message(`Erro ao alterar livro, tente novamente mais tarde.`)
            this.cancel()
        })
    }

    delete = (): void => {

    }

    cancel = (): void => {
        this._location.back()
    }

}
