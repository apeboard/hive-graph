import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { AnythingScalar } from 'src/anything.scalar'
import { GetBaseArgs } from 'src/common/arguments/base.args'
import { WasmParams } from 'src/common/models'
import { CodeInfo, ContractInfo, Wasm } from './models'
import { GetWasmCodeIDArgs } from './wasm.args'
import { GetWasmQueryArgs } from './wasm.args'
import { WasmService } from './wasm.service'

@Resolver(Wasm)
export class WasmResolver {
  constructor(private readonly wasmService: WasmService) {}

  @Query(() => Wasm)
  public async wasm(): Promise<Wasm> {
    return {} as Wasm
  }

  @ResolveField(() => CodeInfo, { nullable: true })
  public async codeInfo(@Args() args: GetWasmCodeIDArgs): Promise<CodeInfo> {
    return this.wasmService.codeInfo(args.codeID, args.height)
  }

  @ResolveField(() => ContractInfo, { nullable: true })
  public async contractInfo(
    @Args('contractAddress') address: string,
    @Args('height') height: number,
  ): Promise<ContractInfo> {
    return this.wasmService.contractInfo(address, height)
  }

  @ResolveField(() => AnythingScalar, { nullable: true })
  public async contractQuery(
    @Args('contractAddress') address: string,
    @Args() qryArgs: GetWasmQueryArgs,
    @Args('height') height: number,
  ): Promise<any> {
    return this.wasmService.contractQuery(address, qryArgs.query, height)
  }

  @ResolveField(() => WasmParams, { nullable: true })
  public async parameters(@Args() args: GetBaseArgs): Promise<WasmParams> {
    return this.wasmService.parameters(args.height)
  }
}
