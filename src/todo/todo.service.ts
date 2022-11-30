import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private todoModel: Model<Todo>) {}

  /**
   * @description Create a new todo item in the database
   * @param {CreateTodoInput} createTodoInput
   * @return {*}  {Promise<Todo>}
   * @memberof TodoService
   */
  async create(createTodoInput: CreateTodoInput): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoInput);
    return await createdTodo.save();
  }

  /**
   * @description Get all todo items from the database
   * @return {*}  {Promise<Todo[]>}
   * @memberof TodoService
   */
  async findAll(): Promise<Todo[]> {
    return await this.todoModel.find().exec();
  }

  /**
   * @description Get a single todo item from the database by id
   * @param {string} id
   * @return {*}  {Promise<Todo>}
   * @memberof TodoService
   */
  async findOne(id: string): Promise<Todo> {
    return await this.todoModel.findById(id).exec();
  }

  /**
   * @description Update a todo item in the database by id
   * @param {string} id
   * @param {UpdateTodoInput} updateTodoInput
   * @return {*}
   * @memberof TodoService
   */
  async update(id: string, updateTodoInput: UpdateTodoInput): Promise<Todo> {
    const existingTodo = await this.todoModel
      .findByIdAndUpdate(id, updateTodoInput)
      .exec();

    if (!existingTodo) {
      throw new NotFoundException('Todo not found');
    }

    return existingTodo;
  }

  /**
   * @description Remove a todo item from the database by id
   * @param {string} id
   * @return {*}  {Promise<Todo>}
   * @memberof TodoService
   */
  remove(id: string): Promise<Todo> {
    const todo = this.todoModel.findByIdAndDelete(id).exec();

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return todo;
  }
}
