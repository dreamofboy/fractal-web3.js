import * as functions from '../../src';

describe('TransactionSigner', () => {
    const chainID = 1;

    let signer;

    beforeEach(() => {
        signer = new functions.TransactionSigner(chainID);
    });

    it('constructor check', () => {
        expect(signer.chainID).toStrictEqual(1);

        signer.chainID = 2;
        expect(signer.chainID).toStrictEqual(2);
    });

    it('calls sign and returns the expected resolved promise', async () => {
        const txdata = {
            type: 1,
            gasAssetID: 0,
            gasPrice: 1000000000,
            gasLimit: 1000000,
            nonce: 0,
            from: 'testsender',
            to: 'testrecipient',
            assetID: 0,
            value: 1,
            data: '0x74657374207061796c6f6164',
            remark: 'test remark'
        };
        const privateKey = '9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658';

        await expect(signer.sign('contract', txdata, privateKey)).resolves.toEqual({
            messageHash: '898609654eaa4860b907e6d302640c1008ca5fc21804fc28bb07da15717b9221',
            rawTransaction:
                '0xf884e50180843b9aca00830f4240808a7465737473656e6465728d74657374726563697069656e7480018c74657374207061796c6f61648b746573742072656d61726bb8418511d15b86506b1d6b50f8cff905f837e9e8026908861df982e9a50f85d0c0e9481b0244b82d1b473f83f37f249800ebb28a938e21675113fe42e7ad0b5443af26',
            signature:
                '0x8511d15b86506b1d6b50f8cff905f837e9e8026908861df982e9a50f85d0c0e9481b0244b82d1b473f83f37f249800ebb28a938e21675113fe42e7ad0b5443af26',
            transactionHash: '0xc2d855afec6c2a69861c4525969b01736d55f721d5d33d52f6f3bda4ecb7772e'
        });
    });
});