import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    newEndpoint(): string;
    hello(): string;
    getProductFilter(): string;
    getProduct(prID: string): string;
    getCategory(prID: string, id: number): string;
    getProducts(limit: number, offset: number, brand: string): string;
}
