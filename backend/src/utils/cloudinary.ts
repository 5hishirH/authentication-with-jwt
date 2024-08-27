import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";
import { ApiError } from "./api-error";
import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

/**
 * Uploads a buffer to Cloudinary and returns the URL and public ID of the uploaded image.
 * @param buffer - The buffer to upload.
 * @returns An object containing the URL and public ID of the uploaded image.
 * @throws {ApiError} If there is an error while uploading to Cloudinary.
 */
export const uploadOnCloudinary = async (
  buffer: Buffer
): Promise<{
  url: string;
  public_id: string;
}> => {
  try {
    const webpBuffer = await sharp(buffer).webp().toBuffer();

    const result: UploadApiResponse = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            (error: UploadApiErrorResponse, result: UploadApiResponse) => {
              if (error) {
                console.log(error);
                reject(error);
              }
              resolve(result);
            }
          )
          .end(webpBuffer);
      }
    );

    const { secure_url, public_id } = result;

    return { url: secure_url, public_id };
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error while uploading to cloudinary");
  }
};
