import fs from "fs";
import path from "path";
import sharp from "sharp";
import { ApiError } from "./api-error";
import { publicPath } from "../constants";

export const saveOnLocalStorage = async (
  tempFilePath: string,
  folderName: string
) => {
  try {
    const folderPath = path.join(publicPath, folderName);
    const fileName = "image" + "-" + Date.now() + ".webp";
    const filePath = path.join(folderPath, fileName);

    await sharp(tempFilePath).webp().toFile(filePath);

    fs.unlink(tempFilePath, function (err) {
      if (err) {
        console.log(err);
      }
    });

    return { fileName, filePath };
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "An error occurred during image processing");
  }
};
