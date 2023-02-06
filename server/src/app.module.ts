import { Module } from '@nestjs/common';
import { ConverterModule } from './converter/converter.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://testbase:AuTkWBcquPXhEkeY@cluster0.i32pbrt.mongodb.net/?retryWrites=true&w=majority',
    ),
    ConverterModule,
  ],
})
export class AppModule {}
