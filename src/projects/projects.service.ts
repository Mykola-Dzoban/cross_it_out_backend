import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Logger } from 'src/utils/ConsoleLogger';
import { CreateProjectDto } from './dto/project.create.dto';
import { GetProjectDto } from './dto/project.get.dto';
import { UpdateProjectDto } from './dto/project.update.dto';

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

  async updateProject(updateProjectDto: UpdateProjectDto) {
    Logger.debug(updateProjectDto);
    await this.db.projects.update(updateProjectDto);
    return {
      success: true,
    };
  }

  async deleteProject(projectId: string) {
    Logger.debug(projectId);
    await this.db.projects.delete(projectId);
    Logger.debug('Project deleted');
    return {
      success: true,
    };
  }
}
