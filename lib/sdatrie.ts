/// <reference path="./datrie.ts" />

module DATrie {

    export class StaticDoubleArrayTrieImpl<ResultType> implements DoubleArrayTrie<ResultType> {

        private base:{[index: number]: number} = {0: 1};
        private check:{[index: number]: number} = {0: 0};
        private dic:{[index: string]: number} = {};
        private children:{[index: number]: Array<number>} = {};
        private results:{[index: number]: ResultType} = {};
        private counterForDic = 1;
        private END_VALUE = -1;

        private getBase(n:number):number {
            return this.base[n];
        }

        private setBase(n:number, m:number, k:number) {
            this.base[n] = m - k;
        }

        private getCheck(m:number):number {
            return this.check[m];
        }

        private setCheck(n:number, m:number) {
            this.check[m] = n;
        }

        private getResult(n:number):ResultType {
            return this.results[n];
        }

        private setResult(n:number, r:ResultType) {
            this.results[n] = r;
        }

        private getCharNumber(c:string):number {
            return this.dic[c] || -1;
        }

        private setCharNumber(c:string, i:number) {
            this.dic[c] = i;
        }

        private getChildren(n:number):Array<number> {
            return this.children[n] || [];
        }

        private setChildren(n:number, children:Array<number>) {
            this.children[n] = children;
        }

        private setDoubleArray(chars:Array<Array<number>>, results:Array<ResultType>, n:number) {
            if (chars.length === 1 && chars[0][0] === this.END_VALUE) {
                this.setResult(n, results[0]);
                return;
            }
            var tailChars = [], before = 0, k = 0, nextChars = {}, nextResults = {};
            for (var i = 0; i < chars.length; i++) {
                var nextChar = chars[i].shift();
                if (before === 0) {
                    k = nextChar;
                } else if (nextChar !== before) {
                    tailChars.push(nextChar);
                }
                if (nextChar in nextChars) {
                    nextChars[nextChar].push(chars[i]);
                    nextResults[nextChar].push(results[i]);
                } else {
                    nextChars[nextChar] = [chars[i]];
                    nextResults[nextChar] = [results[i]];
                }
                before = nextChar;
            }
            this.setChildren(n, [k].concat(tailChars).filter(c => {
                return c !== -1;
            }));
            for (var m = 1; ; m++) {
                var isEmpty = !(m in this.check) && tailChars.every(edge => {
                    return !((m - k + edge) in this.check);
                });
                if (isEmpty) {
                    this.setBase(n, m, k);
                    this.setCheck(n, m);
                    tailChars.forEach((edge, index) => {
                        this.setCheck(n, m - k + edge);
                    });
                    this.setDoubleArray(nextChars[k], nextResults[k], m);
                    tailChars.forEach(edge => {
                        this.setDoubleArray(nextChars[edge], nextResults[edge], m - k + edge);
                    });
                    return;
                }
            }
        }

        build(keys:Array<string>, results:Array<ResultType>):number {
            var chars = keys.map(key => {
                var nums = key.split('').map(c => {
                    if (this.getCharNumber(c) === -1) {
                        this.setCharNumber(c, this.counterForDic);
                        this.counterForDic++;
                    }
                    return this.getCharNumber(c);
                });
                nums.push(this.END_VALUE);
                return nums;
            });
            this.setDoubleArray(chars, results, 0);

            return 0;
        }

        exactMatchSearch(key:string, n:number = 0):ResultType {
            var chars = key.split('').map(c => {
                return this.getCharNumber(c);
            });
            if (!chars.every(c => {
                return c !== -1
            })) return undefined;
            var current = n;
            chars.forEach(c => {
                current = this.traverse(current, c);
            });
            return this.getResult(current);
        }

        private findChild(n:number):Array<ResultType> {
            var results = [];
            var children = this.getChildren(n);
            children.forEach(edge => {
                var child = this.traverse(n, edge);
                results.push(this.getResult(child));
                this.findChild(child);
            });
            return results;
        }

        commonPrefixSearch(key:string, n:number = 0):Array<ResultType> {
            var chars = key.split('').map(c => {
                return this.getCharNumber(c);
            });
            if (!chars.every(c => {
                return c !== -1
            })) return [];
            var current = n;
            chars.forEach(c => {
                current = this.traverse(current, c);
            });
            var result = [this.getResult(current)];
            if (result[0] === undefined) {
                result = [];
            }
            return result.concat(this.findChild(current));
        }

        traverse(n:number, k:number):number {
            var m = this.getBase(n) + k;
            if (this.getCheck(m) == n) {
                return m;
            } else {
                return -1;
            }
        }
    }

}
