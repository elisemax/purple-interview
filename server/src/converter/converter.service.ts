import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConverterDocument } from './schemas/converter.schemas';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { catchError, lastValueFrom, map } from 'rxjs';
import { ConvertCurrencyDto } from './dto/convert-currency.dto';
import { TransactionDocument } from './schemas/transaction.schemas';

@Injectable()
export class ConverterService {
  constructor(
    @InjectModel('Converter') private converterModel: Model<ConverterDocument>,
    @InjectModel('Transactions')
    private transactionsModel: Model<TransactionDocument>,
    private httpService: HttpService,
  ) {}
  async getStatus() {
    return this.converterModel.findOne();
  }
  async getListCurrency() {
    const request = await this.httpService
      .get('https://api.apilayer.com/currency_data/list', {
        headers: {
          'Content-Type': 'application/json',
          apikey: 'pbWSVjf0YKpdIFRMAAXNgR5VV8H5oFBZ',
        },
      })
      .pipe(map((response) => response.data))
      .pipe(catchError((error) => error));
    const data = await lastValueFrom(request);
    return {
      currencies: data.currencies,
    };
  }
  async transactionCreate(dto: ConvertCurrencyDto) {
    const convert = await this.convertCurrency({
      from: dto.from,
      to: dto.to,
      amount: dto.amount,
    });
    const convertUsd = await this.convertCurrency({
      from: dto.to,
      to: 'USD',
      amount: convert.amount,
    });

    await this.transactionsModel.create({
      transactions: [
        {
          from: dto.from,
          to: dto.to,
          amount: dto.amount,
        },
      ],
    });
    const allTransaction = await this.transactionsModel.find();
    const popularCurrency = allTransaction.reduce((acc, item) => {
      const currency = item.transactions[0].to;
      if (!acc[currency]) {
        acc[currency] = 0;
      }
      acc[currency] += 1;
      return acc;
    }, {});

    await this.converterModel.findOneAndUpdate(
      {},
      {
        $inc: {
          totalAmount: convertUsd.amount,
          totalNumberOfConversions: 1,
        },
        $set: {
          popularCurrency: Object.keys(popularCurrency).reduce((a, b) =>
            popularCurrency[a] > popularCurrency[b] ? a : b,
          ),
        },
      },
      { new: true },
    );
    return convert;
  }
  private async convertCurrency(dto: ConvertCurrencyDto) {
    const request = await this.httpService
      .get('https://api.apilayer.com/currency_data/convert?', {
        headers: {
          'Content-Type': 'application/json',
          apikey: 'pbWSVjf0YKpdIFRMAAXNgR5VV8H5oFBZ',
        },
        params: {
          from: dto.from,
          to: dto.to,
          amount: dto.amount,
        },
      })
      .pipe(map((response) => response.data))
      .pipe(catchError((error) => error));
    const data = await lastValueFrom(request);
    return {
      amount: data.result,
    };
  }
}
