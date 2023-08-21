export class CreateMatchHistoryOneDto {
    winnerId: string;
    winnerScore: number;

    loserId: string;
    loserScore: number;
}

export class CreateMatchHistoryTwoDto {
    winnerOneId: string;
    winnerTwoId: string;
    winnerScore: number;

    loserOneId: string;
    loserTwoId: string;
    loserScore: number;
}

export class CreateMatchHistoryThreeDto {
    winnerId: string[];
    winnerScore: number;
    
    loserId: string[];
    loserScore: number;
}