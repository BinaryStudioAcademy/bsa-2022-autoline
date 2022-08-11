export class BrandDTO {
  name: string;
  logo_url: string;
  autoria_code: number;

  constructor(data: never) {
    this.name = data.name;
    this.logo_url = 'not found';
    this.autoria_code = data.marka_id;
  }
}
