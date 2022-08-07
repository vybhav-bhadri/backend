import { HttpException, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import { AllFilesService } from './all-files.service';
import { PageCountService } from './page-count.service';
require('dotenv').config()

@Injectable()
export class FolderService {

    constructor(private readonly pageCountService:PageCountService,private readonly allFilesService:AllFilesService){}

    async copyFileTest(file:any){

        let filename = file.originalname;

        let src = path.join(process.env.HARDDISK_PATH, filename);
        let destDir = path.join(process.env.DESTINATION_PATH, 'uploads');
        
        fs.access(destDir, (err) => {
          if(err)
            fs.mkdirSync(destDir);
        
          this.copyFile(src, path.join(destDir, filename));
        });
        
        //create file in allfiles
        let pages = await this.pageCountService.countPageInPdf(src)
        let filePath = destDir +'\\'+ filename
        await this.allFilesService.createFile(filename,null,filePath,pages);
   
      }

      copyFile(src:string, dest:string) {
        
        let readStream = fs.createReadStream(src);
        readStream.once('error', (err) => {
          console.log(err);
        });
      
        readStream.once('end', () => {
          console.log('done copying');
        });
      
        readStream.pipe(fs.createWriteStream(dest));
      }

}
