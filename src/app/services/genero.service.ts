import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../model/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService
{
  private generos = new Array<Genero>();
  private autoGenerateId = 0;

  private generoGerarId = new Array<Genero>();

  constructor() { }

  insert(gen: Genero): void
  {
    this.generoGerarId = this.list();

    let newId = 0;

    if( this.generoGerarId.length === 0 )
    {
      newId++;
    }
    else
    {
      newId = this.generoGerarId[ this.generoGerarId.length -1 ]._id;
      newId++;
    }

    gen._id = newId;
    this.generos.push(gen);

    // gen._id = this.autoGenerateId;
    // this.generos.push(gen);
    // this.autoGenerateId++;
    this.save();
  }

  list(): Array<Genero>
  {
    this.load();
    return this.generos;
  }

  remove(id: number): void
  {
    for ( let i = 0; i < this.generos.length; i++ )
    {
      let generoFind = this.generos[i];

      if (generoFind._id === id)
      {
        this.generos.splice(i,1);
        break;
      }
    }
    this.save();
  }

  update(gen: Genero): void
  {
    for ( let i = 0; i < this.generos.length; i++ )
    {
      let generoFind = this.generos[i];

      if (generoFind._id === gen._id)
      {
        this.generos[i] = gen;
        break;
      }
    }
    this.save();
  }

  save(): void
  {
    localStorage.setItem('generos', JSON.stringify(this.generos));
  }

  load(): void
  {
    this.generos = JSON.parse(localStorage.getItem('generos'));
    if (this.generos == null)
    {
      this.generos = new Array<Genero>();
    }
  }

  // constructor( private http: HttpClient ) { }

  //   listar(): Observable<Genero[]>
  //   {
  //     return this.http.get<Genero[]>('https://crudcrud.com/api/7176255d2a8541de84ad4b5eec99ff7f/genero');
  //   }

  //   inserir(genero: Genero): Observable<Genero>
  //   {
  //     return this.http.post<Genero>('https://crudcrud.com/api/7176255d2a8541de84ad4b5eec99ff7f/genero', genero);
  //   }

  //   atualizar(genero: Genero): Observable<any>
  //   {
  //     const id = genero._id;
  //     delete genero._id;

  //     return this.http.put<Genero>('https://crudcrud.com/api/7176255d2a8541de84ad4b5eec99ff7f/genero/' + id , genero);
  //   }

  //   remover(id: string): Observable<any>
  //   {
  //     return this.http.delete('https://crudcrud.com/api/7176255d2a8541de84ad4b5eec99ff7f/genero/' + id);
  //   }
}
