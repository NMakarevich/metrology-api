import { Injectable } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PlanningService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createPlanningDto: CreatePlanningDto) {
    const { year, categories } = createPlanningDto;
    return this.prismaService.planning.create({
      data: {
        year,
        categories: {
          createMany: {
            data: categories.map(({ month, categoryId, instrumentsIds }) => ({
              month,
              category: { connect: { id: categoryId } },
              instruments: {
                connect: instrumentsIds.map((id) => id),
              },
            })),
          },
        },
      },
      select: {
        year: true,
        categories: {
          select: {
            month: true,
            instruments: {
              select: {
                clinic: {
                  select: {
                    name: true,
                  },
                },
                model: {
                  select: {
                    validationPrice: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  findAll() {
    return this.prismaService.planning.findMany({
      select: {
        year: true,
      },
    });
  }

  findOne(year: number) {
    return this.prismaService.planning.findUnique({
      where: { year },
      select: {
        year: true,
        categories: {
          select: {
            month: true,
            instruments: {
              select: {
                clinic: {
                  select: {
                    name: true,
                  },
                },
                model: {
                  select: {
                    validationPrice: true,
                  },
                },
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async update(yearId: string, updatePlanningDto: UpdatePlanningDto) {
    const { year, categories } = updatePlanningDto;
    if (year) {
      await this.prismaService.planning.update({ where: { year: +yearId }, data: { year } });
    }
    if (categories.length) {
      const updates = categories.map(({ id, month, connectIds, disconnectIds }) =>
        this.prismaService.planningCategories.update({
          where: { id },
          data: {
            ...(month && { month }),
            instruments: {
              connect: connectIds?.length ? connectIds.map((id) => ({ id })) : [],
              disconnect: disconnectIds?.length ? disconnectIds.map((id) => ({ id })) : [],
            },
          },
        }),
      );
      return this.prismaService.$transaction(updates);
    }
  }

  remove(year: number, id?: string) {
    if (id) {
      return this.prismaService.planningCategories.delete({ where: { id } });
    } else {
      return this.prismaService.planning.delete({ where: { year } });
    }
  }
}
