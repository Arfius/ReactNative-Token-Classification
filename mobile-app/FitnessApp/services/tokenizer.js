// MyLightTokenizer
export default class MyLightTokenizer{
	constructor(vocab) {
        this.vocab = vocab.split("\n")
        this.tokenToId = {};
        this.idToToken = {};

		let idx = 0
        this.vocab.forEach((token) => {
            this.tokenToId[token] = idx;
            this.idToToken[idx] = token;
			idx+=1;
        });
    }

    tokenize(text) {
        const tokens = text.toLowerCase().split(/(\s+|[^\w\s])+/).filter((item) => item != ' ');
        const tokenIds = tokens.map(token => this.tokenToId[token] || this.tokenToId['[UNK]']);
        return {'tokens':tokens, "tokenIds":tokenIds};
    }

    addSpecialTokens(tokens) {
        const clsToken = this.tokenToId['[CLS]'];
        const sepToken = this.tokenToId['[SEP]'];
        tokens.unshift(clsToken);
        tokens.push(sepToken);
        return tokens;
    }

    padTokens(tokens, maxLength) {
        const padToken = this.tokenToId['[PAD]'];
        while (tokens.length < maxLength) {
            tokens.push(padToken);
        }
        return tokens.slice(0, maxLength)
    }
    
}