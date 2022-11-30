import { Field, InputType, Int } from '@nestjs/graphql';

/**
 * @description A todo item input type for creating a new todo item
 * @export
 * @class CreateTodoInput
 */
@InputType()
export class CreateTodoInput {
  @Field(() => String)
  name: string;

  @Field(() => Boolean, {
    defaultValue: false,
  })
  completed: boolean;
}
