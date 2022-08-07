import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import { PageCountService } from './page-count.service';

@Injectable()
export class FolderService {

    constructor(private readonly pageCountService:PageCountService){}
    copyFileTest(file:any){
        let filename = file.originalname;
        let src = path.join('D:\\vybhav\\harddisk', filename);
        let destDir = path.join('D:\\vybhav\\uploadfile', 'uploads');
        
        fs.access(destDir, (err) => {
          if(err)
            fs.mkdirSync(destDir);
        
          copyFile(src, path.join(destDir, filename));
        });
        
        
        function copyFile(src, dest) {
        
          let readStream = fs.createReadStream(src);
        
          readStream.once('error', (err) => {
            console.log(err);
          });
        
          readStream.once('end', () => {
            console.log('done copying');
          });
        
          readStream.pipe(fs.createWriteStream(dest));
        }

        this.pageCountService.countPageInPdf(src)
      }

}
