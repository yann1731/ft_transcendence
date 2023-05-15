import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola mundo desde 42';
  }

  @Get('nuevo')
  newEndpoint() {
    return 'YO soy el nuevo';
  }

  @Get('hello')
  hello(): string {
    return 'Hello new controles';
  }

  // Si no no tiene un ID Dinamico deben ir Primero
  @Get('products/filter')
  getProductFilter() {
    return `Soy un FIlter`;
  }

  // Asi recibo un paramtro
  @Get('products/:prID')
  getProduct(@Param('prID') prID: string) {
    return `Producto ${prID}`;
  }

  // Asi recibo dos paramtros
  @Get('categories/:id/products/:prID')
  getCategory(@Param('prID') prID: string, @Param('id') id: number) {
    return `Producto ${prID} Categorie and ${id}`;
  }

  // Ahora con el Decorador QUERY
  // asi se hace la consulta:
  // http://127.0.0.1:3000/products?brand=leo&limit=7
  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `Prod LImit ==> ${limit} offset ===> ${offset} brand ==> ${brand}`;
  }
}
