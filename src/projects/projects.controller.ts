import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/project.create.dto';
import { GetProjectDto } from './dto/project.get.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjectsByOwnerId(@Body() getProjectDto: GetProjectDto) {
    return this.projectsService.getProjectsByOwnerId(getProjectDto);
  }

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }
}
