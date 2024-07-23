import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateProjectDto } from './dto/project.create.dto';
import { Logger } from 'src/utils/ConsoleLogger';
import { GetProjectDto } from './dto/project.get.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly db: FirebaseService) {}

  async getProjectsByOwnerId(getProjectDto: GetProjectDto) {
    const { ownerId } = getProjectDto;
    Logger.debug(ownerId);
    const projects = await this.db.projects.query((ref) =>
      ref.where('ownerId', '==', ownerId),
    );
    Logger.debug(projects);
    return projects;
  }

  async getProjectById(projectId: string) {
    Logger.debug(projectId);
    const project = await this.db.projects.getById(projectId);
    if (!project) {
      Logger.error('Project not found');
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    Logger.debug(project);
    return project;
  }

  async createProject(createProjectDto: CreateProjectDto) {
    Logger.debug(createProjectDto);
    return this.db.projects.create(createProjectDto);
  }
}
