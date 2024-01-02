import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogPostController } from './blog-post.controller';
import { BlogPost } from './blog-post.model';
import { BlogPostService } from './blog-post.service';

@Module({
  imports: [
    SequelizeModule.forFeature([BlogPost])
  ],
  controllers: [BlogPostController],
  providers: [BlogPostService]
})
export class BlogPostModule {}
