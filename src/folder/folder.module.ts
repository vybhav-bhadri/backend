import { Module } from '@nestjs/common';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { PageCount } from './page-count.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageCountService } from './page-count.service';

@Module({
  imports:[TypeOrmModule.forFeature([PageCount])],
  controllers: [FolderController],
  providers: [FolderService,PageCountService]
})
export class FolderModule {}
