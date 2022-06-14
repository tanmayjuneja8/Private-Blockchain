const Block = require('./block');
const { GENESIS_DATA } = require('./config');

describe('Block', ()=>{
    const timestamp = 'a-date';
    const lasthash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain' , 'data'];

    const block = new Block({timestamp, lasthash, hash, data});
    
    test('has all properties', ()=>{
        expect(block.timestamp).toBe(timestamp);
        expect(block.lasthash).toBe(lasthash);
        expect(block.hash).toBe(hash);
        expect(block.data).toBe(data);
    });

    describe('genesis()', ()=>{
        const genesisBlock = Block.genesis();

        test('returns a Block instance', ()=>{
            expect(genesisBlock instanceof Block).toBe(true);
        });

        test('returns the genesis data' ,()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });

    describe('mineBlock()', ()=>{
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({lastBlock,data});

        test('returns a Block instance', ()=>{
            expect(minedBlock instanceof Block).toBe(true);
        });

        test('sets the `lasthash` to be the `hash` of the lastBlock',()=>{
            expect(minedBlock.lasthash).toEqual(lastBlock.hash);
        });
    });
});