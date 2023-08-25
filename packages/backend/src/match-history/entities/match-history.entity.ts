export class MatchHistoryOne {
    id: string;

    winnerId: string;
    winnerScore: number;

    loserId: string;
    loserScore: number;
}

export class MatchHistoryTwo {
    id: string;

    winnerId: string[];
    winnerScore: number;

    loserId: string[];
    loserScore: number;
}

export class MatchHistoryThree {
    id: string;

    winnerId: string[];
    winnerScore: number;
    
    loserId: string[];
    loserScore: number;
}