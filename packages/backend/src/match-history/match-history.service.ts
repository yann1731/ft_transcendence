import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMatchHistoryOneDto } from './dto/create-match-history.dto';
import { CreateMatchHistoryTwoDto } from './dto/create-match-history.dto';
import { CreateMatchHistoryThreeDto } from './dto/create-match-history.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { match } from 'assert';

@Injectable()
export class MatchHistoryService {
  constructor(private prisma: PrismaService) { }

  async createOne(createMatchHistoryOneDto: CreateMatchHistoryOneDto) {
    try {
      const matchHistoryOne = await this.prisma.matchHistoryOne.create({data: {
        winnerId: createMatchHistoryOneDto.winnerId,
        winnerScore: createMatchHistoryOneDto.winnerScore,
        loserId: createMatchHistoryOneDto.loserId,
        loserScore: createMatchHistoryOneDto.loserScore
      }});
      if (!matchHistoryOne) {
        throw new BadRequestException('Could not create 1vs1 match history');
      }
      return matchHistoryOne; 
    } catch (error) {
      throw error;
    }
  }

  async createTwo(createMatchHistoryTwoDto: CreateMatchHistoryTwoDto) {
    try {
      const matchHistoryTwo = await this.prisma.matchHistoryTwo.create({data: 
        {
          winnerOneId: createMatchHistoryTwoDto.winnerOneId,
          winnerTwoId: createMatchHistoryTwoDto.winnerTwoId,
          winnerScore: createMatchHistoryTwoDto.winnerScore,
          loserOneId: createMatchHistoryTwoDto.loserOneId,
          loserTwoId: createMatchHistoryTwoDto.loserTwoId,
          loserScore: createMatchHistoryTwoDto.loserScore
        }})
        if (!matchHistoryTwo) {
          throw new BadRequestException('Could not create 2vs2 match history');
        }
        return matchHistoryTwo;
    } catch (error) {
      throw error;
    }
  }

  async createThree(createMatchHistoryThreeDto: CreateMatchHistoryThreeDto) {
    try {
      const matchHistoryThree = await this.prisma.matchHistoryThree.create({data: 
        {
          winnerId: createMatchHistoryThreeDto.winnerId,
          winnerScore: createMatchHistoryThreeDto.winnerScore,
          loserId: createMatchHistoryThreeDto.loserId,
          loserScore: createMatchHistoryThreeDto.loserScore
        }})
        if (!matchHistoryThree) {
          throw new BadRequestException("Could not create 1vs3 match history");
        }
        return matchHistoryThree 
    } catch (error) {
      throw error;
    }
  }

  async findAllOne() {
    try {
      return await this.prisma.matchHistoryOne.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findAllTwo() {
    try {
      return await this.prisma.matchHistoryTwo.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findAllThree() {
    try {
      return await this.prisma.matchHistoryThree.findMany();
    } catch (error) {
      throw error;
    }
  }

  async findAllOfOne(userId: string) {
    try {
      const matchHistoryOne = await this.prisma.matchHistoryOne.findMany({ 
        where: {
          OR: [
            { winnerId: userId },
            { loserId: userId }
          ],
        },
        orderBy: {
          createdAt: 'asc'
        }
      });
      if (!matchHistoryOne) {
        throw new BadRequestException('Could not find 1vs1 match history');
      }
      return matchHistoryOne;
    } catch (error) {
      throw error;
    }
  }

  async findAllOfTwo(userId: string) {
    try {
      const matchHistoryTwo = await this.prisma.matchHistoryTwo.findMany({ 
        where: {
          OR: [
            { winnerOneId: userId },
            { winnerTwoId: userId },
            { loserOneId: userId },
            { loserTwoId: userId }
          ],
        },
        orderBy: {
          createdAt: 'asc'
        }
      });
      if (!matchHistoryTwo) {
        throw new BadRequestException('Could not find 2vs2 match history');
      }
      return matchHistoryTwo;
    } catch (error) {
      
    }
  }

  async findAllOfThree(userId: string) {
    try {
      const matchHistoryThree = await this.prisma.matchHistoryThree.findMany({
        where: {
          OR: [
            { winnerId: { has: userId }},
            { loserId: { has: userId }}
          ],
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      if (!matchHistoryThree) {
        throw new BadRequestException('Could not find 1vs3 match history');
      }
      return matchHistoryThree;
    } catch (error) {
      throw error;
    }
  }

  async removeOne(id: string) {
    try {
      const deletedMatchHistoryOne = await this.prisma.matchHistoryOne.delete({ where: { id } });
      if (!deletedMatchHistoryOne) {
        throw new BadRequestException('Could not delete 1vs1 match history');
      }
      return deletedMatchHistoryOne;
    } catch (error) {
      throw error;
    }
  }

  async removeTwo(id: string) {
    try {
      const deletedMatchHistoryTwo = await this.prisma.matchHistoryTwo.delete({ where: { id } });
      if (!deletedMatchHistoryTwo) {
        throw new BadRequestException('Could not delete 2vs2 match history');
      }
      return deletedMatchHistoryTwo;
    } catch (error) {
      throw error;
    }
  }

  async removeThree(id: string) {
    try {
      const deletedMatchHistoryThree = await this.prisma.matchHistoryThree.delete({ where: { id } });
      if (!deletedMatchHistoryThree) {
        throw new BadRequestException('Could not delete 1vs3 match history');
      }
      return deletedMatchHistoryThree;
    } catch (error) {
      throw error;
    }
  }
}