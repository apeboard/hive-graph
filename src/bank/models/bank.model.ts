import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/common/models'

@ObjectType()
export class Bank {
  @Field(() => [Coin], { nullable: true })
  balance?: Promise<Coin[]>

  @Field(() => [Coin], { nullable: true })
  total?: Promise<Coin[]>
}
