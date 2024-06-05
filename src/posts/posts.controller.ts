import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { CreateGroupPostDto } from './dto/creategrouppost.dto';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createPost(@Body() { userId, ...createPostData }: CreatePostDto) {
        return this.postService.createPost(userId, createPostData)
    }

    // POST /posts/group
    @Post('group')
    @UsePipes(ValidationPipe)
    createGroupPost(@Body() { userIds, ...createGroupPostData}: CreateGroupPostDto) {
        return this.postService.createGroupPost(userIds, createGroupPostData)
    }

    @Get('group')
    getGroupPosts() {
        return this.postService.getGroupPosts();
    }
}
