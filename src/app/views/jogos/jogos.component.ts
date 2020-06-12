import { Component, OnInit } from '@angular/core';
import { JogoService } from 'src/app/services/jogo.service';
import { Jogo } from 'src/app/model/jogo';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Directive, Input, ViewChild, ElementRef} from '@angular/core';

import { GeneroService } from 'src/app/services/genero.service';
import { Genero } from 'src/app/model/genero';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.css']
})
export class JogosComponent implements OnInit
{
  jogos: Array<Jogo>;
  colunas = ['nome', 'genero', 'avaliacao', 'status' , 'acoes'];
  jogoSelecionado: Jogo;
  inserindo = false;

  generosLista = new Array<Genero>();

  avaliacaoItens = new Array<string>();
  statusItens = new Array<string>();

  matcher = new MyErrorStateMatcher();
  nomeValidator: FormControl =  new FormControl('', [Validators.required]);
  generoValidator: FormControl =  new FormControl('', [Validators.required]);
  avaliacaoValidator: FormControl =  new FormControl('', [Validators.required]);
  statusValidator: FormControl =  new FormControl('', [Validators.required]);

  @ViewChild("nome") inputEl: ElementRef;

  isChecked = true;

  constructor( private jogoService: JogoService, private generoService: GeneroService ) { }

  ngOnInit(): void
  {
    const carregar = localStorage.getItem('carregarJogos');

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


    this.generoService.listar().subscribe(generos => {
      this.generosLista = generos;
    });

    this.avaliacaoItens.push('Ruim');
    this.avaliacaoItens.push('Ok');
    this.avaliacaoItens.push('Legal');

    this.statusItens.push('Quero');
    this.statusItens.push('Tenho');
    this.statusItens.push('Zerado');
  }

  listar(): void
  {
    // => arrow function
    this.jogoService.listar().subscribe(jogos => {
      this.jogos = jogos;
    });
  }

  remover(id: string): void
  {
    if (confirm('Tem certeza?'))
    {
      this.jogoService.remover(id).subscribe( () => {
        alert('Jogo removido!');
        this.listar();
      });
    }
  }

  selecionar(jogo: Jogo): void
  {
    this.inserindo = false;
    this.jogoSelecionado = jogo;
  }

  cancelar(): void
  {
    this.jogoSelecionado = null;
  }

  salvar(): void
  {
    if ( !this.jogoSelecionado.nome || !this.jogoSelecionado.genero || !this.jogoSelecionado.avaliacao || !this.jogoSelecionado.status )
    {
      alert('Preencha todos os campos obrigatórios!');
    }
    else
    {
      if( this.inserindo )
      {
        this.jogoService.inserir( this.jogoSelecionado ).subscribe( () => {
          alert('Jogo inserido!');
          this.listar();
        });
      }
      else
      {
        this.jogoService.atualizar( this.jogoSelecionado ).subscribe( () => {
          alert('Jogo atualizado!');
          this.listar();
        });
      }
      this.jogoSelecionado = null;
    }

  }

  new(): void
  {
    this.inserindo = true;
    this.jogoSelecionado = new Jogo();

    setTimeout( () => { this.inputEl.nativeElement.focus();  }, 100 );
  }

  retornarIcone(generoNome: string): string
  {
    let retornoIcone = "";
    for (let i = 0; i < this.generosLista.length; i++)
    {
      let generoatual = this.generosLista[i];

      if ( generoatual.nome === generoNome )
      {
        retornoIcone = generoatual.icone;
        break;
      }
    }
    return retornoIcone;
  }


  saveOption(): void
  {
    let carregar = localStorage.getItem('carregarJogos');

    if ( !this.isChecked )
    {
      carregar = 'sim';
    }
    else
    {
      carregar = 'nao';
    }

    localStorage.setItem('carregarJogos', carregar );
  }

}
