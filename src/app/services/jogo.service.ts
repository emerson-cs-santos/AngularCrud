import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jogo } from '../model/jogo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JogoService
{
  constructor( private http: HttpClient ) { }

  listar(): Observable<Jogo[]>
  {
    return this.http.get<Jogo[]>('https://crudcrud.com/api/081b0c42424b44b88d6aae43452c6a4e/jogo');
  }

  inserir(jogo: Jogo): Observable<Jogo>
  {
    return this.http.post<Jogo>('https://crudcrud.com/api/081b0c42424b44b88d6aae43452c6a4e/jogo', jogo);
  }

  atualizar(jogo: Jogo): Observable<any>
  {
    const id = jogo._id;
    delete jogo._id;

    return this.http.put<Jogo>('https://crudcrud.com/api/081b0c42424b44b88d6aae43452c6a4e/jogo/' + id , jogo);
  }

  remover(id: string): Observable<any>
  {
    return this.http.delete('https://crudcrud.com/api/081b0c42424b44b88d6aae43452c6a4e/jogo/' + id);
  }
}
