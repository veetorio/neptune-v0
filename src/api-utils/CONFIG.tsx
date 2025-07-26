export const URL_DEV = "http://localhost:8080"

export interface Inscricao {
  id: number;
  local: string;
  nome: string;
  atividade: boolean;
  idade : number,
  nascimento : string
}

export interface EventoI {
  nome: string;
  dateGo: string;       // Data de início no formato 'YYYY-MM-DD'
  dateEnd: string;      // Data de término no formato 'YYYY-MM-DD'
  timeGo: string;       // Hora de início no formato 'HH:mm:ss'
  timeEnd: string;      // Hora de término no formato 'HH:mm:ss'
  investido: number;       // Valor investido
}

export interface EventoIOut extends EventoI {
  idEvento: number;
  escricoes: Inscricao[];  // Lista de inscrições para o evento
  arrecadacao: number;
  atividade : boolean;     // Valor arrecadado
}
export interface EventoIOutUpdate extends EventoI {
  arrecadacao: number;
  idEvento: number;
  atividade : boolean;     // Valor arrecadado
}



