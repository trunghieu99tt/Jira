import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({
  collection: 'users',
})
export class User {
  @Field(() => String)
  @Prop(String)
  username: string;

  @Field(() => String)
  @Prop(String)
  password: string;

  @Field(() => String)
  @Prop(String)
  email: string;

  @Field(() => String)
  @Prop(String)
  name: string;

  @Field(() => String)
  @Prop(String)
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export interface UserDocument extends User, Document {}
