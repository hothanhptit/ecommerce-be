/// <reference types="multer" />
export declare const multerConfig: {
    dest: string;
};
export declare const multerOptions: {
    limits: {
        fileSize: number;
    };
    fileFilter: (req: any, file: any, cb: any) => void;
    storage: import("multer").StorageEngine;
};
