import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { IncomingMessage } from 'http';
import { mkdirSync, createWriteStream } from 'fs';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { fileContract } from '@delivery-fish-monorepo/contract';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @TsRestHandler(fileContract.updateFile)
  @UseInterceptors(FileInterceptor('file'))
  handleUpdateFile(@UploadedFile() file: Express.Multer.File) {
    return tsRestHandler(fileContract.updateFile, async () => {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
      const uniqueName = Date.now() + '-' + file.originalname;
      try {
        await this.fileService.uploadToR2(file.path, uniqueName);
        await unlink(file.path); //xóa file tạm sau khi upload
        return {
          status: 200 as const,
          body: {
            message: 'File uploaded successfully',
            name: uniqueName,
            // path: file.path,
          },
        };
      } catch (error) {
        if (file.path) {
          await unlink(file.path); // Xóa file tạm nếu upload thất bại
        }
        throw new BadRequestException('Could not upload file');
      }
    });
  }

  // @Post('file')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new BadRequestException('No file uploaded');
  //   }
  //   try {
  //     await this.fileService.uploadToR2(file.path, file.filename);
  //     await unlink(file.path);
  //     return {
  //       message: 'File uploaded successfully',
  //     };
  //   } catch (error) {
  //     if (file.path) {
  //       await unlink(file.path); // Xóa file tạm nếu upload thất bại
  //     }
  //     throw new BadRequestException('Could not upload file');
  //   }
  // }

  @TsRestHandler(fileContract.getFile)
  handleGetFile(@Param('filename') filename: string) {
    return tsRestHandler(fileContract.getFile, async () => {
      try {
        const filePath = await this.fileService.downloadFile(filename);

        // console.log('file', file);
        // console.log('contentType', contentType);
        // res.setHeader(
        //   'Content-Type',
        //   contentType || 'application/octet-stream'
        // );
        // res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

        // const buffer = await streamToBuffer(file as IncomingMessage);
        //
        // const uploadPath = join(__dirname, '..', '..', 'images');
        // const filePath = join(uploadPath, filename);
        //
        // // Ensure the upload directory exists
        // mkdirSync(uploadPath, { recursive: true });
        //
        // const writeStream = createWriteStream(filePath);
        // writeStream.write(buffer);
        // writeStream.end();
        // // writeStream.on('finish', () => {
        // //
        // //   res.send({ message: 'File saved successfully', path: filePath });
        // // });
        // writeStream.on('error', (error) => {
        //   throw new BadRequestException('Could not save file');
        // });
        return {
          status: 200 as const,
          body: {
            message: 'Get file successfully',
            path: filePath,
          },
        };
      } catch (error) {
        throw new NotFoundException('File not found');
      }
    });
  }

  //   @Get('file/:filename')
  //   async getFile(@Param('filename') filename: string, @Res() res: Response) {
  //     try {
  //       const { file, contentType } = await this.fileService.getFile(filename);
  //
  //       // console.log('file', file);
  //       // console.log('contentType', contentType);
  //       res.setHeader('Content-Type', contentType || 'application/octet-stream');
  //       res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
  //
  //       const buffer = await streamToBuffer(file as IncomingMessage);
  //
  //       const uploadPath = join(__dirname, '..', '..', 'images');
  //       const filePath = join(uploadPath, filename);
  //
  //       // Ensure the upload directory exists
  //       mkdirSync(uploadPath, { recursive: true });
  //
  //       const writeStream = createWriteStream(filePath);
  //       writeStream.write(buffer);
  //       writeStream.end();
  //       writeStream.on('finish', () => {
  //         res.send({ message: 'File saved successfully', path: filePath });
  //       });
  //
  //       writeStream.on('error', (error) => {
  //         console.error('Error writing file:', error);
  //         throw new BadRequestException('Could not save file');
  //       });
  //     } catch (error) {
  //       throw new NotFoundException('File not found');
  //     }
  //   }

  @TsRestHandler(fileContract.deleteFile)
  handleDeleteFile(@Param('filename') filename: string) {
    return tsRestHandler(fileContract.deleteFile, async () => {
      try {
        await this.fileService.deleteFile(filename);
        return {
          status: 200 as const,
          body: {
            message: 'File deleted successfully',
          },
        };
      } catch (error) {
        throw new NotFoundException('File not found');
      }
    });
  }
}
