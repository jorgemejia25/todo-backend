import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateTodoInput } from './create-todo.input';

/**
 * @description A todo item input type for updating a todo item
 * @export
 * @class UpdateTodoInput
 * @extends {PartialType(CreateTodoInput)}
 */
@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => String)
  id: string;
}
