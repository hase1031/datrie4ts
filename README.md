datrie4ts
=========

## About
### Double Array Trie written in TypeScript

- sdatrie.ts
    - static double array
- ddatrie.ts
    - dynamic double array(coming soon)


## Usage

```typescript
///<reference path="sdatrie.ts" />
var keys = ['aa', 'ab', 'bb', 'bc']; //keys must be sorted alphabetically
var results = [1, 2, 3, 4]; //results are values corresponding to keys
var datrie = new DATrie.StaticDoubleArrayTrieImpl<number>();
datrie.build(keys, results);
var r = datrie.commonPrefixSearch('a'); //return [1, 2]
var e = datrie.exactMatchSearch('aa'); //return 1
```

## Test

```
$ karma start
```

## Author
Takayuki Hasegawa <takayuki.hasegawa0311@gmail.com>


