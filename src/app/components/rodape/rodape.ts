import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TemaService } from '../../../services/tema';

@Component({
  selector: 'app-rodape',
  imports: [RouterLink],
  templateUrl: './rodape.html',
  styleUrl: './rodape.css',
  host: {
    '[class.modo-escuro]': "temaService.tema().includes('escuro')",
    '[class.tema-vitoria]': "temaService.tema() === 'vitoria'",
    '[class.tema-bahia]': "temaService.tema() === 'bahia'",
    '[class.tema-vitoria-escuro]': "temaService.tema() === 'vitoria-escuro'",
    '[class.tema-bahia-escuro]': "temaService.tema() === 'bahia-escuro'",
  },
})
export class Rodape {
  readonly temaService = inject(TemaService);
  readonly ano = new Date().getFullYear();
}