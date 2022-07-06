const { hand } = require("./handAnalyzer");

describe("Analyze Hand", () => {
    test('["AS", "KH"], ["JH", "9H", "10H", "QH", "3H"]', () => {
        expect(hand(["AS", "KH"], ["JH", "9H", "10H", "QH", "3H"])).toEqual({type: "straight-flush", ranks: ["K", "Q", "J", "10", "9"]});
    });

    test('["AS", "KH"], ["JH", "9H", "10H", "QH", "3D"]', () => {
        expect(hand(["AS", "KH"], ["JH", "9H", "10H", "QH", "3D"])).toEqual({type: "straight-flush", ranks: ["K", "Q", "J", "10", "9"]});
    });

    test('["AH", "KH"], ["JH", "9H", "10H", "QH", "3D"]', () => {
        expect(hand(["AH", "KH"], ["JH", "9H", "10H", "QH", "3D"])).toEqual({type: "straight-flush", ranks: ["A", "K", "Q", "J", "10"]});
    });

    test('["AS", "JD"], ["JH", "5H", "JS", "QH", "JC"]', () => {
        expect(hand(["AS", "JD"], ["JH", "5H", "JS", "QH", "JC"])).toEqual({type: "four-of-a-kind", ranks: ["A", "J"]});
    });

    test('["2S", "JD"], ["JH", "5H", "JS", "7H", "JC"]', () => {
        expect(hand(["2S", "JD"], ["JH", "5H", "JS", "7H", "JC"])).toEqual({type: "four-of-a-kind", ranks: ["J", "7"]});
    });

    test('["2S", "JD"], ["5C", "5H", "2H", "7H", "5S"]', () => {
        expect(hand(["2S", "JD"], ["5C", "5H", "2H", "7H", "5S"])).toEqual({type: "full-house", ranks: ["5", "2"]});
    });

    test('["2S", "2D"], ["5C", "5H", "2H", "7H", "5S"]', () => {
        expect(hand(["2S", "2D"], ["5C", "5H", "2H", "7H", "5S"])).toEqual({type: "full-house", ranks: ["5", "2"]});
    });

    test('["AS", "KD"], ["JH", "5H", "10H", "QH", "3H"]', () => {
        expect(hand(["AS", "KD"], ["JH", "5H", "10H", "QH", "3H"])).toEqual({type: "flush", ranks: ["Q", "J", "10", "5", "3"]});
    });

    test('["2S", "6D"], ["3H", "5H", "JS", "7H", "4C"]', () => {
        expect(hand(["2S", "6D"], ["3H", "5H", "JS", "7H", "4C"])).toEqual({type: "straight", ranks: ["7", "6", "5", "4", "3"]});
    });

    test('["2S", "6D"], ["3H", "5H", "3D", "3S", "4C"]', () => {
        expect(hand(["2S", "6D"], ["3H", "5H", "3D", "3S", "4C"])).toEqual({type: "straight", ranks: ["6", "5", "4", "3", "2"]});
    });

    test('["7S", "6D"], ["3H", "5H", "3D", "QS", "4C"]', () => {
        expect(hand(["7S", "6D"], ["3H", "5H", "3D", "3S", "4C"])).toEqual({type: "straight", ranks: ["7", "6", "5", "4", "3"]});
    });

    test('["2S", "2D"], ["5C", "4H", "2H", "7H", "QS"]', () => {
        expect(hand(["2S", "2D"], ["5C", "4H", "2H", "7H", "QS"])).toEqual({type: "three-of-a-kind", ranks: ["Q", "7", "2"]});
    });

    test('["AS", "AD"], ["JC", "5C", "5H", "2H", "3D"]', () => {
        expect(hand(["AS", "AD"], ["JC", "5C", "5H", "2H", "3D"])).toEqual({type: "two-pair", ranks: ["A", "J", "5"]});
    });

    test('["AS", "AD"], ["2C", "5C", "5H", "2H", "3D"]', () => {
        expect(hand(["AS", "AD"], ["2C", "5C", "5H", "2H", "3D"])).toEqual({type: "two-pair", ranks: ["A", "5", "3"]});
    });

    test('["AS", "AD"], ["JC", "5H", "10H", "2H", "3D"]', () => {
        expect(hand(["AS", "AD"], ["JC", "5H", "10H", "2H", "3D"])).toEqual({type: "pair", ranks: ["A", "J", "10", "5"]});
    });

    test('["2S", "AD"], ["JC", "5H", "10H", "2H", "3D"]', () => {
        expect(hand(["2S", "AD"], ["JC", "5H", "10H", "2H", "3D"])).toEqual({type: "pair", ranks: ["A", "J", "10", "2"]});
    });

    test('["AS", "7D"], ["JC", "5H", "10H", "2H", "3D"]', () => {
        expect(hand(["AS", "7D"], ["JC", "5H", "10H", "2H", "3D"])).toEqual({type: "nothing", ranks: ["A", "J", "10", "7", "5"]});
    });
});