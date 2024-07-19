import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CreateProjectDto } from './dto/project.create.dto';
import { Logger } from 'src/utils/ConsoleLogger';

@Injectable()
export class ProjectsService {
  constructor(private readonly db: FirebaseService) {}

  async createProject(createProjectDto: CreateProjectDto) {
    Logger.debug(createProjectDto);
    return this.db.projects.create(createProjectDto);
  }
}
