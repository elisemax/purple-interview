import { Module } from '@nestjs/common';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConverterSchema } from './schemas/converter.schemas';
import { HttpModule } from '@nestjs/axios';
import { TransactionSchema } from './schemas/transaction.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Converter', schema: ConverterSchema }]),
    MongooseModule.forFeature([
      { name: 'Transactions', schema: TransactionSchema },
    ]),
    HttpModule,
  ],
  controllers: [ConverterController],
  providers: [ConverterService],
})
export class ConverterModule {}
