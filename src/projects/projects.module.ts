import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ProjectsController } from './projects.controller';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, FirebaseService],
})
export class ProjectsModule {}
