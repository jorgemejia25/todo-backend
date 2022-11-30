import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    // Import the ConfigModule and load the .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Import the MongooseModule and connect to the MongoDB database
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGO_URI'),
      }),
    }),
    // Import the GraphQLModule and configure it
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: './schema.gql',
      driver: ApolloDriver,
      sortSchema: true,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
