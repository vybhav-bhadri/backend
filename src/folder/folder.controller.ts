import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FolderService } from './folder.service';
import { multerOptions } from './file.upload';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('folder')
export class FolderController {

    constructor(private readonly folderService:FolderService){}

    @Post('/uploadFile')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async uploadToDepartmentOne( @UploadedFile() file) {
        this.folderService.copyFileTest(file)
        console.log("controller",file)
    }

    @Post('/createFolder')
    createFolder(){
        
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
