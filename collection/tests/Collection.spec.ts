import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Collection } from '../wrappers/Collection';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Collection', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Collection');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let collection: SandboxContract<Collection>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        collection = blockchain.openContract(Collection.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await collection.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: collection.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and collection are ready to use
    });
});
