import { Controller, Post, Put, Delete, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post("/add")
  async add() { }

  @Put("/update")
  async update() { }

  @Delete("/delete")
  async delete() { }

  @Post("/getCategoryList")
  async getCategoryList() { }

  @Get("/getCategoryDictionary")
  async getCategoryDictionary() { }
}
