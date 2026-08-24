export declare class UploadService {
    private s3;
    constructor();
    uploadFile(file: Express.Multer.File, folder: string): Promise<string>;
}
