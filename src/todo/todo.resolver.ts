import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  /**
   * @description Create a new todo item
   * @param {CreateTodoInput} createTodoInput
   * @return {*}
   * @memberof TodoResolver
   */
  @Mutation(() => Todo)
  async createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
  ): Promise<Todo> {
    return await this.todoService.create(createTodoInput);
  }

  /**
   * @description Get all todo items
   * @return {*}  {Promise<Todo[]>}
   * @memberof TodoResolver
   */
  @Query(() => [Todo], { name: 'todos' })
  async findAll(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }

  /**
   * @description Get a single todo item by id
   * @param {string} id
   * @return {*}  {Promise<Todo>}
   * @memberof TodoResolver
   */
  @Query(() => Todo, { name: 'todo' })
  async findOne(@Args('id', { type: () => String }) id: string): Promise<Todo> {
    return await this.todoService.findOne(id);
  }

  /**
   * @description Update a todo item by id
   * @param {UpdateTodoInput} updateTodoInput
   * @return {*}  {Promise<Todo>}
   * @memberof TodoResolver
   */
  @Mutation(() => Todo)
  async updateTodo(
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ): Promise<Todo> {
    return await this.todoService.update(updateTodoInput.id, updateTodoInput);
  }

  /**
   * @description Remove a todo item by id
   * @param {string} id
   * @return {*}  {Promise<Todo>}
   * @memberof TodoResolver
   */
  @Mutation(() => Todo)
  async removeTodo(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Todo> {
    return await this.todoService.remove(id);
  }
}
