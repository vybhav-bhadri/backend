import { Controller, Get, HttpStatus, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FolderService } from './folder.service';
import { multerOptions } from './file.upload';
import { AuthGuard } from 'src/guards/auth.guard';
import { PageCountService } from './page-count.service';
import { AllFilesService } from './all-files.service';

@Controller('folder')
export class FolderController {

    constructor(private readonly folderService:FolderService,
        private readonly pageCountService:PageCountService,
        private readonly allFilesService:AllFilesService){}

    @Post('/uploadFile')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async upload( @Res() response,@UploadedFile() file) {
        let result = await this.checkFile(file.originalname)
        console.log(result)
        if(!result){
            this.folderService.copyFileTest(file)
            console.log("created file",file)
            return response.status(HttpStatus.CREATED).json({
                message:file
            })
        }

        return response.status(HttpStatus.BAD_REQUEST).json({
            message:"file already exits"
        })   
    }

    @Post('/createFolder')
    createFolder(){
        
    }

    checkFile(filename:string){
        return this.allFilesService.findByFileName(filename)
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
