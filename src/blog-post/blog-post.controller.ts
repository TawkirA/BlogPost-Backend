import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogPostService } from './blog-post.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('blog-post')
@ApiTags('blog-post')
export class BlogPostController {
    constructor(private blogPostService: BlogPostService) {}
    @Get()
    getAllPosts() {
        return this.blogPostService.findAll();
    }

    @Get('/:id')
    getPostById(@Param('id') id: number) {
        return this.blogPostService.findOne(id);
    }

    @Post()
    createPost(@Body() body: CreatePostDto) {
        console.log('REQ', body)
        return this.blogPostService.create(body);
    }

    @Patch('/:id')
    updatePost(@Param('id') id: number, @Body() body: CreatePostDto) {
        return this.blogPostService.update(id, body);
    }

    @Delete('/:id')
    deletePost(@Param('id') id: number) {
        return this.blogPostService.delete(id)
    }
}
