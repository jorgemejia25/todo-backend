import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoResolver } from './todo.resolver';
import { TodoSchema } from './entities/todo.entity';
import { TodoService } from './todo.service';

@Module({
  providers: [TodoResolver, TodoService],
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
})
export class TodoModule {}
