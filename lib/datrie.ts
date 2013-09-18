/**
 * Static Double Array Trie for TypeScript
 *
 * @author: Takayuki Hasegawa <takayuki.hasegawa0311@gmail.com>
 *
 */

module DATrie {

    export interface DoubleArrayTrie<ResultType> {

        /**
         * Builds the double array.
         *
         * @param keys list of key, keys must be sorted alphabetically.
         * @param results value corresponding to key
         */
        build(keys:Array<string>, results:Array<ResultType>): number

        /**
         * Searches result exactly.
         *
         * @param key
         * @param n number of node
         */
        exactMatchSearch(key:string, n:number): ResultType

        /**
         * Searches results partially.
         *
         * @param key
         * @param n number of node
         */
        commonPrefixSearch(key:string, n:number): Array<ResultType>

        /**
         * Gets the number of child from parent.
         *
         * @param n the number of parent node
         * @param k edge to child node
         */
        traverse(n:number, k:number):number
    }

}
