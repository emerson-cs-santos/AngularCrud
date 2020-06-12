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
  }

  listar(): void
  {
    // => arrow function
    this.generoService.listar().subscribe(generos => {
      this.generos = generos;
    });
  }

  remover(id: string): void
  {
    if (confirm('Tem certeza?'))
    {
      this.generoService.remover(id).subscribe( () => {
        alert('Gênero removido!');
        this.listar();
      });
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
        this.generoService.inserir( this.generoSelecionado ).subscribe( () => {
          alert('Gênero inserido!');
          this.listar();
        });
      }
      else
      {
        this.generoService.atualizar( this.generoSelecionado ).subscribe( () => {
          alert('Gênero atualizado!');
          this.listar();
        });
      }
      this.generoSelecionado = null;
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
