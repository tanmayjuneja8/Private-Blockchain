const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', ()=>{
    const blockchain = new Blockchain();
    test(' contains a `chain` Array instance', ()=>{
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    test('starts with the genesis block', ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    test('adds a new block to chain', ()=>{
        const newData = 'foo bar';
        blockchain.addBlock({data: newData});
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });

    describe('isValidChain()', ()=>{
        describe('when chain does not start with genesis', ()=>{
            test('returns false', ()=>{
                blockchain.chain[0] = {data : 'fake-genesis'};

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('chain has genesis and multiple block',()=>{
            describe('and a lasthash value has changed', ()=>{
                test('returns false', ()=>{
                    blockchain.chain[0] = Block.genesis();
                    blockchain.addBlock({data: 'Bears'});
                    blockchain.addBlock({data: 'Beets'});
                    blockchain.addBlock({data: 'Battlestar Galactica'});

                    blockchain.chain[2].lasthash = 'broken-lasthash';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            })

            describe('and chain does not contain any invalid block', ()=>{
                test('returns true', ()=>{
                    
                });
            });
        });
    });
});