import { Module } from '@nestjs/common';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { PageCount } from './page-count.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageCountService } from './page-count.service';
import { AllFilesService } from './all-files.service';
import { AllFiles } from './all-files.model';

@Module({
  imports:[TypeOrmModule.forFeature([PageCount,AllFiles])],
  controllers: [FolderController],
  providers: [FolderService,PageCountService,AllFilesService]
})
export class FolderModule {}
