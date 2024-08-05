import { asyncHandler } from "../utils/async-handler";
import { ApiError } from "../utils/api-error";
import { saveOnLocalStorage } from "../utils/sharp";
import { publicPath } from "../constants";

export const testImage = asyncHandler(async (req, res) => {
  console.log(publicPath);

  if (req.file) {
    console.log(req.file);
    const fileName = await saveOnLocalStorage(req.file.path, "post");

    console.log(`${req.protocol}://${req.get("host")}/public/post/${fileName}`);
  }

  res.send("ok");
});
