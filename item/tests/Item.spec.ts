import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Item } from '../wrappers/Item';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Item', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Item');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let item: SandboxContract<Item>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        item = blockchain.openContract(Item.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await item.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: item.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and item are ready to use
    });
});
