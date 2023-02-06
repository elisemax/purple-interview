import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;
type TransactionType = {
  from: string;
  to: string;
  amount: number;
};

@Schema()
export class Transaction {
  @Prop()
  transactions: TransactionType[];
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
