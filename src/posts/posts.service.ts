import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    createPost(userId: number, data: Prisma.PostCreateWithoutUserInput) {
        return this.prisma.post.create( { 
            data: {
                ...data,
                userId,
            } 
        });
    }

    createGroupPost(
        userIds: number[],
        data: Prisma.GroupPostCreateWithoutUsersInput,
    ) {
        return this.prisma.groupPost.create({
            data: {
                ...data,
                users: {
                    create: userIds.map((userId) => ({ userId })),
                }
            }
        });
    }

    getGroupPosts() {
        return this.prisma.groupPost.findMany({ 
            include: {
                users: {
                    select: {
                        user: true,
                    }
                },
            },
        });
    }
}
