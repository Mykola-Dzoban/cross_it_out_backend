import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/project.create.dto';
import { GetProjectDto } from './dto/project.get.dto';
import { UpdateProjectDto } from './dto/project.update.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjectsByOwnerId(@Body() getProjectDto: GetProjectDto) {
    return this.projectsService.getProjectsByOwnerId(getProjectDto);
  }

  @Get(':id')
  getProjectsById(@Param('id') projectId: string) {
    return this.projectsService.getProjectById(projectId);
  }

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Patch()
  updateProject(@Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.updateProject(updateProjectDto);
  }

  @Delete(':id')
  deleteProject(@Param('id') projectId: string) {
    return this.projectsService.deleteProject(projectId);
  }
}
