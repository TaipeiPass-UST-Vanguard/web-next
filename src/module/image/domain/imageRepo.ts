import ImageEntity from "./imageEntity";

export type ImageUploadCallback = (progress: number) => void;

export default interface ImageRepo {
    upload(file: File, onProgress?: ImageUploadCallback): Promise<ImageEntity>;
}
