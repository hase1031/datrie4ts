/// <reference path="../bower_components/DefinitelyTyped/sinon/sinon-1.5.d.ts" />
/// <reference path="../bower_components/DefinitelyTyped/mocha/mocha.d.ts" />
/// <reference path="../bower_components/DefinitelyTyped/expect.js/expect.js.d.ts" />
/// <reference path="../trie.ts" />
describe('trie', function () {
    var names = [
        'はせがわ',
        'ちば',
        'さとう',
        'さかの',
        'はぎわら',
        'すずき',
        'すがの',
        'こたけ',
        'あじま'
    ];
    it('build', function () {
        var trie = new Trie.build(names);
        console.log(Trie.tree.root.children);
        expect(true).to.be.eql(true);
    });
});
//# sourceMappingURL=10_trie.js.map
