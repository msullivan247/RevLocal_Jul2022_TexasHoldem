const { hand } = require("./handAnalyzer");

describe("Analyze Hand", () => {
    test('["A♠", "K♥"], ["J♥", "9♥", "10♥", "Q♥", "3♥"]', () => {
        expect(hand(["A♠", "K♥"], ["J♥", "9♥", "10♥", "Q♥", "3♥"])).toEqual({type: "straight-flush", ranks: ["K", "Q", "J", "10", "9"]});
    });

    test('["A♠", "K♥"], ["J♥", "9♥", "10♥", "Q♥", "3♦"]', () => {
        expect(hand(["A♠", "K♥"], ["J♥", "9♥", "10♥", "Q♥", "3♦"])).toEqual({type: "straight-flush", ranks: ["K", "Q", "J", "10", "9"]});
    });

    test('["A♥", "K♥"], ["J♥", "9♥", "10♥", "Q♥", "3♦"]', () => {
        expect(hand(["A♥", "K♥"], ["J♥", "9♥", "10♥", "Q♥", "3♦"])).toEqual({type: "straight-flush", ranks: ["A", "K", "Q", "J", "10"]});
    });

    test('["A♠", "J♦"], ["J♥", "5♥", "J♠", "Q♥", "J♣"]', () => {
        expect(hand(["A♠", "J♦"], ["J♥", "5♥", "J♠", "Q♥", "J♣"])).toEqual({type: "four-of-a-kind", ranks: ["A", "J"]});
    });

    test('["2♠", "J♦"], ["J♥", "5♥", "J♠", "7♥", "J♣"]', () => {
        expect(hand(["2♠", "J♦"], ["J♥", "5♥", "J♠", "7♥", "J♣"])).toEqual({type: "four-of-a-kind", ranks: ["J", "7"]});
    });

    test('["2♠", "J♦"], ["5♣", "5♥", "2♥", "7♥", "5♠"]', () => {
        expect(hand(["2♠", "J♦"], ["5♣", "5♥", "2♥", "7♥", "5♠"])).toEqual({type: "full-house", ranks: ["5", "2"]});
    });

    test('["2♠", "2♦"], ["5♣", "5♥", "2♥", "7♥", "5♠"]', () => {
        expect(hand(["2♠", "2♦"], ["5♣", "5♥", "2♥", "7♥", "5♠"])).toEqual({type: "full-house", ranks: ["5", "2"]});
    });

    test('["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"]', () => {
        expect(hand(["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"])).toEqual({type: "flush", ranks: ["Q", "J", "10", "5", "3"]});
    });

    test('["2♠", "6♦"], ["3♥", "5♥", "J♠", "7♥", "4C"]', () => {
        expect(hand(["2♠", "6♦"], ["3♥", "5♥", "J♠", "7♥", "4C"])).toEqual({type: "straight", ranks: ["7", "6", "5", "4", "3"]});
    });

    test('["2♠", "6♦"], ["3♥", "5♥", "3♦", "3♠", "4♣"]', () => {
        expect(hand(["2♠", "6♦"], ["3♥", "5♥", "3♦", "3♠", "4♣"])).toEqual({type: "straight", ranks: ["6", "5", "4", "3", "2"]});
    });

    test('["7♠", "6♦"], ["3♥", "5♥", "3♦", "Q♠", "4♣"]', () => {
        expect(hand(["7♠", "6♦"], ["3♥", "5♥", "3♦", "Q♠", "4♣"])).toEqual({type: "straight", ranks: ["7", "6", "5", "4", "3"]});
    });

    test('["2♠", "2♦"], ["5♣", "4♥", "2♥", "7♥", "Q♠"]', () => {
        expect(hand(["2♠", "2♦"], ["5♣", "4♥", "2♥", "7♥", "Q♠"])).toEqual({type: "three-of-a-kind", ranks: ["Q", "7", "2"]});
    });

    test('["A♠", "A♦"], ["J♣", "5♣", "5♥", "2♥", "3♦"]', () => {
        expect(hand(["A♠", "A♦"], ["J♣", "5♣", "5♥", "2♥", "3♦"])).toEqual({type: "two-pair", ranks: ["A", "J", "5"]});
    });

    test('["A♠", "A♦"], ["2♣", "5♣", "5♥", "2♥", "3♦"]', () => {
        expect(hand(["A♠", "A♦"], ["2♣", "5♣", "5♥", "2♥", "3♦"])).toEqual({type: "two-pair", ranks: ["A", "5", "3"]});
    });

    test('["A♠", "A♦"], ["J♣", "5♥", "10♥", "2♥", "3♦"]', () => {
        expect(hand(["A♠", "A♦"], ["J♣", "5♥", "10♥", "2♥", "3♦"])).toEqual({type: "pair", ranks: ["A", "J", "10", "5"]});
    });

    test('["2♠", "A♦"], ["J♣", "5♥", "10♥", "2♥", "3♦"]', () => {
        expect(hand(["2♠", "A♦"], ["J♣", "5♥", "10♥", "2♥", "3♦"])).toEqual({type: "pair", ranks: ["A", "J", "10", "2"]});
    });

    test('["A♠", "7♦"], ["J♣", "5♥", "10♥", "2♥", "3♦"]', () => {
        expect(hand(["A♠", "7♦"], ["J♣", "5♥", "10♥", "2♥", "3♦"])).toEqual({type: "nothing", ranks: ["A", "J", "10", "7", "5"]});
    });
});