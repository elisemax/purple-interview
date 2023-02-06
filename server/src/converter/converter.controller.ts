import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ConvertCurrencyDto } from './dto/convert-currency.dto';

@Controller('api/converter')
export class ConverterController {
  constructor(private converterService: ConverterService) {}

  @Get('/status')
  getStatus() {
    return this.converterService.getStatus();
  }
  @Get('/listCurrency')
  listCurrency() {
    return this.converterService.getListCurrency();
  }
  @Post('/convert')
  convertCurrency(@Body() dto: ConvertCurrencyDto) {
    return this.converterService.transactionCreate(dto);
  }
}
