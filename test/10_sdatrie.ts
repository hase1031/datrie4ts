/// <reference path="../bower_components/DefinitelyTyped/sinon/sinon-1.5.d.ts" />
/// <reference path="../bower_components/DefinitelyTyped/mocha/mocha.d.ts" />
/// <reference path="../bower_components/DefinitelyTyped/expect.js/expect.js.d.ts" />
/// <reference path="../lib/sdatrie.ts" />

describe('sdatrie', () => {
    var keys = ['aa', 'ab', 'bb', 'bc'];
    var results = [1, 2, 3, 4];
    var datrie = new DATrie.StaticDoubleArrayTrieImpl<number>();

    it('build', () => {
        var result = datrie.build(keys, results);
        expect(0).to.be.eql(result);
    });

    it('traverse', () => {
        expect(1).to.be.eql(datrie.traverse(0, 1));
        expect(2).to.be.eql(datrie.traverse(0, 2));
        expect(3).to.be.eql(datrie.traverse(1, 1));
        expect(4).to.be.eql(datrie.traverse(1, 2));
        expect(5).to.be.eql(datrie.traverse(2, 2));
        expect(6).to.be.eql(datrie.traverse(2, 3));
    });

    it('exactMatchSearch', () => {
        expect(1).to.be.eql(datrie.exactMatchSearch('aa'));
        expect(2).to.be.eql(datrie.exactMatchSearch('ab'));
        expect(3).to.be.eql(datrie.exactMatchSearch('bb'));
        expect(4).to.be.eql(datrie.exactMatchSearch('bc'));
    });

    it('commonPrefixSearch', () => {
        expect([1, 2]).to.be.eql(datrie.commonPrefixSearch('a'));
        expect([3, 4]).to.be.eql(datrie.commonPrefixSearch('b'));
        expect([1]).to.be.eql(datrie.commonPrefixSearch('aa'));
        expect([2]).to.be.eql(datrie.commonPrefixSearch('ab'));
        expect([3]).to.be.eql(datrie.commonPrefixSearch('bb'));
        expect([4]).to.be.eql(datrie.commonPrefixSearch('bc'));
    });
});
