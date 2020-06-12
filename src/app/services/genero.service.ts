import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../model/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService
{
  constructor( private http: HttpClient ) { }

    listar(): Observable<Genero[]>
    {
      return this.http.get<Genero[]>('https://crudcrud.com/api/081b0c42424b44b88d6aae43452c6a4e/genero');
    }

    inserir(genero: Genero): Observable<Genero>
    {
      return this.http.post<Genero>('https://crudcrud.com/api/081b0c42424b44b88d6aae43452c6a4e/genero', genero);
    }

    atualizar(genero: Genero): Observable<any>
    {
      const id = genero._id;
      delete genero._id;

      return this.http.put<Genero>('https://crudcrud.com/api/081b0c42424b44b88d6aae43452c6a4e/genero/' + id , genero);
    }

    remover(id: string): Observable<any>
    {
      return this.http.delete('https://crudcrud.com/api/081b0c42424b44b88d6aae43452c6a4e/genero/' + id);
    }
}
