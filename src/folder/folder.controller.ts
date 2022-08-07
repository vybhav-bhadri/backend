import { Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FolderService } from './folder.service';
import { multerOptions } from './file.upload';
import { AuthGuard } from 'src/guards/auth.guard';
import { PageCountService } from './page-count.service';

@Controller('folder')
export class FolderController {

    constructor(private readonly folderService:FolderService,
        private readonly pageCountService:PageCountService){}

    @Post('/uploadFile')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async uploadToDepartmentOne( @UploadedFile() file) {
        this.folderService.copyFileTest(file)
        console.log("controller",file)
    }

    @Post('/createFolder')
    createFolder(){
        
    }

    @Get('/totalPageCount')
    async getTotalPageCount(){
        const result = await this.pageCountService.getTotalPageCount()
        return result;
    }

    // @Post('/department2')
    // @UseInterceptors(FileInterceptor('file', multerOptions))
    // async uploadToDepartmentTwo( @UploadedFile() file) {
    //     this.folderService.copyFileTest(file)
    //     console.log(file)
    // }

    // @Post('/department2')
    // @UseInterceptors(FileInterceptor('file', multerOptions))
    // async uploadToDepartmentThree( @UploadedFile() file) {
    //     this.folderService.copyFileTest(file)
    //     console.log(file)
}
