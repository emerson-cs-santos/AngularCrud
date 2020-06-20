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


    this.generosLista = this.generoService.list();

    this.avaliacaoItens.push('Ruim');
    this.avaliacaoItens.push('Ok');
    this.avaliacaoItens.push('Legal');

    this.statusItens.push('Quero');
    this.statusItens.push('Tenho');
    this.statusItens.push('Zerado');

    this.cargaInicial();
  }


  cargaInicial(): void
  {
    const jogoCargaInicial = localStorage.getItem('jogoCargaInicial');

    if ( jogoCargaInicial !== 'ok')
    {
      let idCount = 0;
      let arrayCount = 0;

      const novoJogoArray = new Array<Jogo>();
      const novoJogo = new Jogo();


      // Item 1
      novoJogo._id = idCount++;
      novoJogo.nome = 'Mario';
      novoJogo.genero = 'Plataforma';
      novoJogo.avaliacao = 'Legal';
      novoJogo.status = 'Zerado';

      novoJogoArray.push(novoJogo);
      this.jogoService.insert( novoJogoArray[arrayCount] );
      arrayCount++;

      // Item 2
      novoJogo._id = idCount++;
      novoJogo.nome = 'Yu-Gi-Oh!';
      novoJogo.genero = 'Cartas';
      novoJogo.avaliacao = 'Ok';
      novoJogo.status = 'Tenho';

      novoJogoArray.push(novoJogo);
      this.jogoService.insert( novoJogoArray[arrayCount] );
      arrayCount++;

      // Item 3
      novoJogo._id = idCount++;
      novoJogo.nome = 'Magic';
      novoJogo.genero = 'Cartas';
      novoJogo.avaliacao = 'Ok';
      novoJogo.status = 'Quero';

      novoJogoArray.push(novoJogo);
      this.jogoService.insert( novoJogoArray[arrayCount] );
      arrayCount++;

      // Item 4
      novoJogo._id = idCount++;
      novoJogo.nome = 'Fifa';
      novoJogo.genero = 'Futebol';
      novoJogo.avaliacao = 'Ruim';
      novoJogo.status = 'Zerado';

      novoJogoArray.push(novoJogo);
      this.jogoService.insert( novoJogoArray[arrayCount] );
      arrayCount++;

      // Item 5
      novoJogo._id = idCount++;
      novoJogo.nome = 'The King of Fighters';
      novoJogo.genero = 'Luta';
      novoJogo.avaliacao = 'ok';
      novoJogo.status = 'Zerado';

      novoJogoArray.push(novoJogo);
      this.jogoService.insert( novoJogoArray[arrayCount] );
      arrayCount++;

      // Item 6
      novoJogo._id = idCount++;
      novoJogo.nome = 'Black';
      novoJogo.genero = 'FPS';
      novoJogo.avaliacao = 'Legal';
      novoJogo.status = 'Zerado';

      novoJogoArray.push(novoJogo);
      this.jogoService.insert( novoJogoArray[arrayCount] );
      arrayCount++;

      // Item 7
      novoJogo._id = idCount++;
      novoJogo.nome = 'DOOM';
      novoJogo.genero = 'FPS';
      novoJogo.avaliacao = 'Legal';
      novoJogo.status = 'Quero';

      novoJogoArray.push(novoJogo);
      this.jogoService.insert( novoJogoArray[arrayCount] );
      arrayCount++;



      localStorage.setItem('jogoCargaInicial', 'ok');

      this.isChecked = true;
      localStorage.setItem('carregarJogos', 'sim' );
      this.listar();
    }
  }



  listar(): void
  {
    // => arrow function
    this.jogos = this.jogoService.list();
  }

  remover(id: number): void
  {
    if (confirm('Tem certeza?'))
    {
        this.jogoService.remove(id);
        alert('Jogo removido!');
        this.listar();
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
          this.jogoService.insert( this.jogoSelecionado );
      }
      else
      {
          this.jogoService.update( this.jogoSelecionado );
      }
      this.listar();
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
