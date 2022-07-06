exports.hand = (holeCards, communityCards) => {
    let allCards = holeCards.concat(communityCards)
        .map(card => parseCard(card))
        .sort((a, b) => b.rankNumber > a.rankNumber ? 1 : -1);

    let [hasFlush, suitedCards] = checkFlush(allCards);
    if (hasFlush) {
        return handleFlush(suitedCards);
    }

    let [cardsGroupedByRank, largestSetLength] = groupByRank(allCards);
    if (largestSetLength === 4) {
        return handleSetOfFour(cardsGroupedByRank, allCards);
    }

    if (largestSetLength === 3) {
        return handleSetOfThree(cardsGroupedByRank, allCards);
    }

    let [hasStraight, straightRanks] = checkStraight(allCards);
    if (hasStraight) {
        return {
            type: "straight",
            ranks: straightRanks
        };
    }

    if (largestSetLength === 2) {
        return handleSetOfTwo(cardsGroupedByRank, allCards);
    }

    return {
        type: "nothing",
        ranks: getTopRanks(allCards.slice(0, 5))
    };
}

handleFlush = suitedCards => {
    let [hasStraight, straightRanks] = checkStraight(suitedCards);
    if (hasStraight) {
        return {
            type: "straight-flush",
            ranks: straightRanks
        };
    }

    return {
        type: "flush",
        ranks: getTopRanks(suitedCards)
    };
}

handleSetOfFour = (cardsGroupedByRank, allCards) => {
    let fourOfAKind = cardsGroupedByRank.find(s => s.length === 4);
    let topCard = cardsExcludingRanks(allCards, [fourOfAKind[0].rank]).slice(0, 1);
    return {
        type: "four-of-a-kind",
        ranks: getTopRanks(fourOfAKind.concat(topCard))
    };
}

handleSetOfThree = (cardsGroupedByRank, allCards) => {
    let threeOfAKind = cardsGroupedByRank.find(s => s.length === 3);
    let nextHighestSet = cardsGroupedByRank.filter(c => c[0].rank !== threeOfAKind[0].rank).find(s => s.length > 1);
    if (nextHighestSet) {
        return {
            type: "full-house",
            ranks: getTopRanks(threeOfAKind.concat(nextHighestSet))
        };
    }

    let [hasStraight, straightRanks] = checkStraight(allCards);
    if (hasStraight) {
        return {
            type: "straight",
            ranks: straightRanks
        };
    }

    let topTwo = cardsExcludingRanks(allCards, [threeOfAKind[0].rank]).slice(0, 2);
    return {
        type: "three-of-a-kind",
        ranks: getTopRanks(threeOfAKind.concat(topTwo))
    };
}

handleSetOfTwo = (cardsGroupedByRank, allCards) => {
    let firstPair = cardsGroupedByRank.find(s => s.length === 2);
    let secondPair = cardsGroupedByRank.filter(c => c[0].rank !== firstPair[0].rank).find(s => s.length > 1);
    if (secondPair) {
        let topCard = cardsExcludingRanks(allCards, [firstPair[0].rank, secondPair[0].rank]).slice(0, 1);
        return {
            type: "two-pair",
            ranks: getTopRanks(firstPair.concat(secondPair).concat(topCard))
        };
    }

    let topThree = cardsExcludingRanks(allCards, [firstPair[0].rank]).slice(0, 3);
    return {
        type: "pair",
        ranks: getTopRanks(firstPair.concat(topThree))
    };
}

parseCard = card => {
    let suit = card.substring(card.length - 1);
    let rank = card.substring(0, card.length - 1);
    let rankNumber = getRankNumber(rank);
    return { suit: suit, rank: rank, rankNumber: rankNumber };
}

cardsExcludingRanks = (cards, excludedRanks) => {
    return cards.filter(c => excludedRanks.indexOf(c.rank) === -1);
}

getTopRanks = cards => {
    return distinct(cards.sort((a, b) => b.rankNumber > a.rankNumber ? 1 : -1).map(c => c.rank).slice(0, 5));
}

distinct = values => {
    return values.filter((value, index, all) => all.indexOf(value) === index);
}

checkFlush = cards => {
    for (let suit of ["S", "H", "D", "C"]) {
        if (cards.filter(c => c.suit === suit).length >= 5) {
            return [true, cards.filter(c => c.suit === suit)];
        }
    }
    
    return [false, null];
}

checkStraight = cards => {
    let distinctRankNumbers = distinct(cards.map(c => c.rankNumber));

    if (distinctRankNumbers.length < 5) {
        return [false, null];
    }

    let seriesOfFive = distinctRankNumbers.length - 4;
    for (let i = 0; i < seriesOfFive; i++) {
        let series = distinctRankNumbers.slice(i, i + 5);
        if (series[0] - series[4] === 4) {
            return [true, series.map(r => getRank(r))];
        }
    }

    return [false, null];
}

groupByRank = cards => {
    let distinctRanks = distinct(cards.map(c => c.rank));
    let largestSet = 1;
    let grouped = [];
    for (let rank of distinctRanks) {
        let set = cards.filter(c => c.rank === rank);
        if (set.length > largestSet) {
            largestSet = set.length;
        }
        grouped.push(set);
    }
    return [grouped, largestSet];
}

getRankNumber = rank => {
    switch(rank) {
        case "A":
            return 14;
        case "K":
            return 13;
        case "Q":
            return 12;
        case "J":
            return 11;
        default:
            return parseInt(rank);
    }
}

getRank = rankNumber => {
    switch(rankNumber) {
        case 14:
            return "A";
        case 13:
            return "K";
        case 12:
            return "Q";
        case 11:
            return "J";
        default:
            return rankNumber.toString();
    }
}