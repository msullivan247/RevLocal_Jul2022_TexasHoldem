const { hand } = require("./handAnalyzer");

describe("Analyze Hand", () => {
    test('["AS", "AD"], ["JC", "5H", "10H", "2H", "3D"]', () => {
        expect(hand(["AS", "AD"], ["JC", "5H", "10H", "2H", "3D"])).toEqual({type: "pair", ranks: ["A", "J", "10", "5"]});
    });

    test('["AS", "KD"], ["JH", "5H", "10H", "QH", "3H"]', () => {
        expect(hand(["AS", "KD"], ["JH", "5H", "10H", "QH", "3H"])).toEqual({type: "flush", ranks: ["Q", "J", "10", "5", "3"]});
    });
});