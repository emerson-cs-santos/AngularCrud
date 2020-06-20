import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jogo } from '../model/jogo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JogoService
{
  private jogos = new Array<Jogo>();
  private autoGenerateId = 0;

  private jogoGerarId = new Array<Jogo>();

  constructor( ) { }

  insert(jogo: Jogo): void
  {
    this.jogoGerarId = this.list();

    let newId = 0;

    if( this.jogoGerarId.length === 0 )
    {
      newId++;
    }
    else
    {
      newId = this.jogoGerarId[ this.jogoGerarId.length -1 ]._id;
      newId++;
    }

    jogo._id = newId;
    this.jogos.push(jogo);

    // gen._id = this.autoGenerateId;
    // this.jogos.push(gen);
    // this.autoGenerateId++;
    this.save();
  }

  list(): Array<Jogo>
  {
    this.load();
    return this.jogos;
  }

  remove(id: number): void
  {
    for ( let i = 0; i < this.jogos.length; i++ )
    {
      let jogoFind = this.jogos[i];

      if (jogoFind._id === id)
      {
        this.jogos.splice(i,1);
        break;
      }
    }
    this.save();
  }

  update(gen: Jogo): void
  {
    for ( let i = 0; i < this.jogos.length; i++ )
    {
      let jogoFind = this.jogos[i];

      if (jogoFind._id === gen._id)
      {
        this.jogos[i] = gen;
        break;
      }
    }
    this.save();
  }

  save(): void
  {
    localStorage.setItem('jogos', JSON.stringify(this.jogos));
  }

  load(): void
  {
    this.jogos = JSON.parse(localStorage.getItem('jogos'));
    if (this.jogos == null)
    {
      this.jogos = new Array<Jogo>();
    }
  }


  // listar(): Observable<Jogo[]>
  // {
  //   return this.http.get<Jogo[]>('https://crudcrud.com/api/7176255d2a8541de84ad4b5eec99ff7f/jogo');
  // }

  // inserir(jogo: Jogo): Observable<Jogo>
  // {
  //   return this.http.post<Jogo>('https://crudcrud.com/api/7176255d2a8541de84ad4b5eec99ff7f/jogo', jogo);
  // }

  // atualizar(jogo: Jogo): Observable<any>
  // {
  //   const id = jogo._id;
  //   delete jogo._id;

  //   return this.http.put<Jogo>('https://crudcrud.com/api/7176255d2a8541de84ad4b5eec99ff7f/jogo/' + id , jogo);
  // }

  // remover(id: string): Observable<any>
  // {
  //   return this.http.delete('https://crudcrud.com/api/7176255d2a8541de84ad4b5eec99ff7f/jogo/' + id);
  // }

}
