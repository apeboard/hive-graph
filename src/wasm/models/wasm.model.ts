import { Field, ObjectType } from '@nestjs/graphql'
import { AnythingScalar } from 'src/anything.scalar'

@ObjectType()
export class Wasm {
  @Field(() => AnythingScalar, { nullable: true })
  contractQuery?: Promise<any>
}
