import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BlogPost } from './blog-post.model';

@Injectable()
export class BlogPostService {
    constructor(@InjectModel(BlogPost) private blogPostModel: typeof BlogPost) {}

    async findAll(): Promise<BlogPost[]> {
        return await this.blogPostModel.findAll()
    }

    async findOne(id: number): Promise<any> {
        const post = await this.blogPostModel.findOne({
            where: { id }
        });

        if (!post) {
            throw new NotFoundException('Post not found!')
        }

        return post; 
    }

    async create(postData: any) {
        const post = await this.blogPostModel.create(postData);
        return post;
    }

    async update(id: number, postData: any) {
        const post = await this.blogPostModel.findOne({ where: { id } });

        if (!post) {
            throw new BadRequestException('Invalid blog id')
        }

        return await post.update(postData);
    }

    async delete(id: number) {
        const post = await this.blogPostModel.findOne({ where: { id } });

        if (!post) {
            throw new BadRequestException('Invalid post id')
        }
        
        return await this.blogPostModel.destroy({ where: {id} });
    }
}
