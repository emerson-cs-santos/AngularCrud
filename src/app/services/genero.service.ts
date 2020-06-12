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
      return this.http.get<Genero[]>('https://crudcrud.com/api/36528b82f75c43eabd2d62baa3eeeb78/genero');
    }

    inserir(genero: Genero): Observable<Genero>
    {
      return this.http.post<Genero>('https://crudcrud.com/api/36528b82f75c43eabd2d62baa3eeeb78/genero', genero);
    }

    atualizar(genero: Genero): Observable<any>
    {
      const id = genero._id;
      delete genero._id;

      return this.http.put<Genero>('https://crudcrud.com/api/36528b82f75c43eabd2d62baa3eeeb78/genero/' + id , genero);
    }

    remover(id: string): Observable<any>
    {
      return this.http.delete('https://crudcrud.com/api/36528b82f75c43eabd2d62baa3eeeb78/genero/' + id);
    }
}
