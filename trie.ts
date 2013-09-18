module Trie {
    export interface ITree {
        root: INode;
    };
    export interface INode {
        int: number;
        parent?: IEdge;
        children?: IEdge[];
    };
    export interface IEdge {
        char: string;
        from: INode;
        to: INode;
    };
    export var tree: ITree = {
        root: {
            int: 0
        }
    };
    export class build{
        words: string[];
        counter: number;
        constructor (words: string[]) {
            this.words = words;
            this.init();
        }
        init () {
            this.words.forEach((word) => {
                this.update(word);
            });
        }
        private update (word: string) {
            var current: INode = tree.root;
            var chars: string[] = word.split('');
            chars.forEach((char) => {
                // TODO: 一文字づつTrieに入れる
                var to: INode = {
                    int: this.counter++
                };
                var edge: IEdge = {
                    char: char,
                    from: current,
                    to: to
                };
                to.parent = edge;
                if (current.children) {
                    current.children.push(edge);
                } else {
                    current.children = [edge];
                }
                current = to;
            });
        }
    }
    export class search {
        constructor () {

        }
        init () {

        }
    }
}