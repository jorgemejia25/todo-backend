import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Todo {
  @Field(() => String)
  id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => Boolean, {
    defaultValue: false,
  })
  completed: boolean;

  @Prop()
  @Field(() => String)
  createdAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
