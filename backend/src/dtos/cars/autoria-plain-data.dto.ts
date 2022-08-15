class AutoriaPlainDataDto {
  name: string;
  autoria_code: number;
  constructor(data: { name: string; value: number }) {
    this.name = data.name;
    this.autoria_code = data.value;
  }
}
export { AutoriaPlainDataDto };
