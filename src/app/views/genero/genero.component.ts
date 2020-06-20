import { Component, OnInit } from '@angular/core';
import { GeneroService } from 'src/app/services/genero.service';
import { Genero } from 'src/app/model/genero';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Directive, Input, ViewChild, ElementRef} from '@angular/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit
{
  generos: Array<Genero>;
  colunas = ['nome', 'icone', 'acoes'];
  generoSelecionado: Genero;
  inserindo = false;

  corItens = new Array<string>();

  matcher = new MyErrorStateMatcher();
  generoValidator: FormControl =  new FormControl('', [Validators.required]);
  corValidator: FormControl =  new FormControl('', [Validators.required]);
  @ViewChild("nome") inputEl: ElementRef;

  isChecked = true;

  constructor( private generoService: GeneroService ) { }

  ngOnInit(): void
  {
    const carregar = localStorage.getItem('carregar');

    if( carregar === 'sim' )
    {
      this.isChecked = true;
    }
    else
    {
      this.isChecked = false;
    }

    if ( this.isChecked )
    {
      this.listar();
    }

    this.corItens.push('games');
    this.corItens.push('videogame_asset');
    this.corItens.push('sports_esports');
    this.corItens.push('sports_soccer');
    this.corItens.push('casino');

    this.cargaInicial();
  }

  cargaInicial(): void
  {
    const generoCargaInicial = localStorage.getItem('generoCargaInicial');

    if ( generoCargaInicial !== 'ok')
    {
      let idCount = 0;
      let arrayCount = 0;

      const novoGenArray = new Array<Genero>();
      const novoGen = new Genero();


      // Item 1
      novoGen._id = idCount++;
      novoGen.nome = 'Plataforma';
      novoGen.icone = 'games';

      novoGenArray.push(novoGen);
      this.generoService.insert( novoGenArray[arrayCount] );
      arrayCount++;


      // Item 2
      novoGen._id = idCount++;
      novoGen.nome = 'Luta';
      novoGen.icone = 'videogame_asset';

      novoGenArray.push(novoGen);
      this.generoService.insert( novoGenArray[arrayCount] );
      arrayCount++;

      // Item 3
      novoGen._id = idCount++;
      novoGen.nome = 'FPS';
      novoGen.icone = 'sports_esports';

      novoGenArray.push(novoGen);
      this.generoService.insert( novoGenArray[arrayCount] );
      arrayCount++;

      // Item 4
      novoGen._id = idCount++;
      novoGen.nome = 'Futebol';
      novoGen.icone = 'sports_soccer';

      novoGenArray.push(novoGen);
      this.generoService.insert( novoGenArray[arrayCount] );
      arrayCount++;

      // Item 5
      novoGen._id = idCount++;
      novoGen.nome = 'Cartas';
      novoGen.icone = 'casino';

      novoGenArray.push(novoGen);
      this.generoService.insert( novoGenArray[arrayCount] );
      arrayCount++;


      localStorage.setItem('generoCargaInicial', 'ok');

      this.isChecked = true;
      localStorage.setItem('carregar', 'sim' );
      this.listar();
    }
  }

  listar(): void
  {
    // => arrow function
    this.generos = this.generoService.list();
  }

  remover(id: number): void
  {
    if (confirm('Tem certeza?'))
    {
      this.generoService.remove(id);
      this.cancelar();
      this.listar();
    }
  }

  selecionar(genero: Genero): void
  {
    this.inserindo = false;
    this.generoSelecionado = genero;
  }

  cancelar(): void
  {
    this.generoSelecionado = null;
  }

  salvar(): void
  {
    if ( !this.generoSelecionado.nome || !this.generoSelecionado.icone )
    {
      alert('Preencha os campos obrigatórios!');
    }
    else
    {
      if( this.inserindo )
      {
        this.generoService.insert( this.generoSelecionado );
      }
      else
      {
        this.generoService.update( this.generoSelecionado );
      }
      this.generoSelecionado = null;
      this.listar();
    }
  }

  new(): void
  {
    this.inserindo = true;
    this.generoSelecionado = new Genero();

    setTimeout( () => { this.inputEl.nativeElement.focus();  }, 100 );
  }

  saveOption(): void
  {
    let carregar = localStorage.getItem('carregar');

    if ( !this.isChecked )
    {
      carregar = 'sim';
    }
    else
    {
      carregar = 'nao';
    }

    localStorage.setItem('carregar', carregar );
  }

}
