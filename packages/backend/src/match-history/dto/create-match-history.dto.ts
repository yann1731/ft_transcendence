export class CreateMatchHistoryOneDto {
    winnerId: string;
    winnerScore: number;

    loserId: string;
    loserScore: number;
}

export class CreateMatchHistoryTwoDto {
    winnerId: string[];
    winnerScore: number;

    loserId: string[];
    loserScore: number;
}

export class CreateMatchHistoryThreeDto {
    winnerId: string[];
    winnerScore: number;
    
    loserId: string[];
    loserScore: number;
}