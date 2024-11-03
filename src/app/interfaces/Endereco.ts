export default interface Endereco {
  id?: string;
  nome: string;
  cep: string;
  cidade: string;
  estado: string;
  numero?: string;
  logradouro: string;
  complemento?: string;
  unidade?: string;
  localidade?: string;
  uf?: string;
  regiao?: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;

  usuario_id?: string;
  erro?: boolean;

}
