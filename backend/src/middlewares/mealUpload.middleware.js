import multer from "multer";


const storage =
  multer.memoryStorage();


const fileFilter =
(
  req,
  file,
  cb
) => {

  const allowedTypes = [

    "image/jpeg",

    "image/png",

    "image/webp",

    "image/heic",

    "image/heif"

  ];


  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {

    cb(
      null,
      true
    );

  } else {

    cb(
      new Error(
        "Only image files are allowed"
      )
    );

  }

};


export const mealImageUpload =
  multer({

    storage,

    limits: {

      fileSize:
        8 * 1024 * 1024

    },

    fileFilter

  });