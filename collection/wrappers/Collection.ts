import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type CollectionConfig = {};

export function collectionConfigToCell(config: CollectionConfig): Cell {
    return beginCell().endCell();
}

export class Collection implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Collection(address);
    }

    static createFromConfig(config: CollectionConfig, code: Cell, workchain = 0) {
        const data = collectionConfigToCell(config);
        const init = { code, data };
        return new Collection(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
