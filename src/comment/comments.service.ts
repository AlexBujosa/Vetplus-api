import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AddCommentInput } from './graphql/input/add-comment.input';
import { CommentByIdClinic, GetMyComment } from './constant';
import { DeleteCommentInput } from './graphql/input/delete-comment.input';
import { GenericByIdInput } from '@/global/graphql/input/generic-by-id.input';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async addComment(
    addCommentInput: AddCommentInput,
    id_owner: string,
  ): Promise<boolean> {
    const { id, comment } = addCommentInput;
    const result = await this.prismaService.comment.create({
      data: {
        id_clinic: id,
        comment,
        id_owner,
      },
    });

    return result ? true : false;
  }

  async getMyComments(id_owner: string): Promise<GetMyComment[]> {
    const result = await this.prismaService.comment.findMany({
      where: {
        Clinic: {
          id_owner,
        },
      },
      include: {
        Owner: {
          include: {
            AppointmentOwner: {
              select: {
                start_at: true,
                end_at: true,
              },
              orderBy: {
                start_at: 'desc',
              },
              take: 1,
            },
            ClinicUsers: {
              select: {
                points: true,
              },
              where: {
                Clinic: {
                  id_owner,
                },
              },
            },
          },
        },
      },
    });
    return result;
  }

  async getAllCommentByIdClinic(
    genericByIdInput: GenericByIdInput,
  ): Promise<CommentByIdClinic[]> {
    const { id } = genericByIdInput;
    const result = await this.prismaService.comment.findMany({
      where: {
        id_clinic: id,
      },
      include: {
        Owner: {
          include: {
            ClinicUsers: {
              select: {
                points: true,
              },
              where: {
                id_clinic: id,
              },
            },
          },
        },
      },
    });
    return result;
  }

  async deleteComment(
    deleteCommentInput: DeleteCommentInput,
    id_owner: string,
  ): Promise<boolean> {
    const { id, id_clinic } = deleteCommentInput;
    const result = await this.prismaService.comment.update({
      data: {
        status: true,
      },
      where: {
        id_clinic,
        id,
        id_owner,
      },
    });

    return result ? true : false;
  }
}
