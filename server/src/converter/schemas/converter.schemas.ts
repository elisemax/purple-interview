import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConverterDocument = HydratedDocument<Converter>;

@Schema()
export class Converter {
  @Prop()
  totalAmount: number;

  @Prop()
  totalNumberOfConversions: number;

  @Prop()
  popularCurrency: string;
}

export const ConverterSchema = SchemaFactory.createForClass(Converter);
