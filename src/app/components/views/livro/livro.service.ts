import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {LivroModel} from "./livro.model";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class LivroService {

    baseUrl: string = environment.baseUrl

    constructor(private http: HttpClient, private _snack: MatSnackBar) {
    }

    message = (str: string): void => {
        this._snack.open(`${str}`, 'OK', {
            horizontalPosition: "end",
            verticalPosition: "top",
            duration: 3000
        })
    }

    create = (livro: LivroModel, idCat: string): Observable<LivroModel> => {
        const url = `${this.baseUrl}/livros?categoria=${idCat}`

        return this.http.post<LivroModel>(url, livro)
    }

    update = (livro: LivroModel): Observable<LivroModel> => {
        const url = `${this.baseUrl}/livros`

        return this.http.put<LivroModel>(url, livro)
    }

    findAllByCategoria = (idCat: string): Observable<LivroModel[]> => {
        const url = `${this.baseUrl}/livros?categoria=${idCat}`

        return this.http.get<LivroModel[]>(url)
    }

    delete = (id: string): Observable<void> => {
        const url = `${this.baseUrl}/livros/${id}`;
        return this.http.delete<void>(url);
    }

    findById = (idLivro: string): Observable<LivroModel> => {
        const url = `${this.baseUrl}/livros/${idLivro}`

        return this.http.get<LivroModel>(url)
    }
}
