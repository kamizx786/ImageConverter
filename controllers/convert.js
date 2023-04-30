const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const potrace=require("potrace");
const pngToIco = require('png-to-ico');
import cloudinary from "cloudinary";
const heicConvert = require('heic-convert');

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.Cloud_name,
  api_key: process.env.Cloud_key,
  api_secret: process.env.Cloud_Secret,
});


export const ConverttoJPG = async (req, res) => {
  if (!req.files.image)
    return res.status(400).send("Please Add Image to Convert");
  try {
    if(req.files.image.type==="image/heic" 
    ||req.files.image.type==="application/octet-stream")
    {
      const inputBuffer = fs.readFileSync(req.files.image.path);
      heicConvert({
        buffer: inputBuffer,
        format: 'JPEG'
      }).then(async(outputBuffer) => {
        // Resize and reduce the color depth of the output PNG image
        sharp(outputBuffer)
          .jpeg({ quality: 100, colors: 256 })
          .toBuffer(async (err, buffer) => {
            if (err) {
              console.error(err);
            } else {
              const tempFilePath = path.join("uploads", `${Date.now()}.jpg`);
              fs.writeFileSync(tempFilePath, buffer);
              // Upload the temporary file to Cloudinary
              const data = await cloudinary.uploader.upload(tempFilePath, {
                resource_type: "auto",
                public_id: `${Date.now()}`,
              });
    
              // Remove the temporary file
              fs.unlinkSync(tempFilePath);
              
              res.json({
                public_id: data.public_id,
                url: data.secure_url,
                status:true
              });
            }
          });
      })

    }else{
    sharp(req.files.image.path)
      .toFormat("jpg")
      .toBuffer(async (err, buffer) => {
        if (err) {
          console.error(err);
        } else {
          const tempFilePath = path.join("uploads", `${Date.now()}.jpg`);
          fs.writeFileSync(tempFilePath, buffer);
          // Upload the temporary file to Cloudinary
          const data = await cloudinary.uploader.upload(tempFilePath, {
            resource_type: "auto",
            public_id: `${Date.now()}`,
          });

          // Remove the temporary file
          fs.unlinkSync(tempFilePath);
          
          res.json({
            public_id: data.public_id,
            url: data.secure_url,
            status:true
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Image Conversion and Upload Error",
      status:false
     
    });
  }
};
export const ConverttoPNG = async (req, res) => {
  if (!req.files.image)
    return res.status(400).send("Please Add Image to Convert");
  try {
    if(req.files.image.type==="image/heic"
    ||req.files.image.type==="application/octet-stream"
    )
    {
      const inputBuffer = fs.readFileSync(req.files.image.path);
      heicConvert({
        buffer: inputBuffer,
        format: 'PNG'
      }).then((outputBuffer) => {
        // Resize and reduce the color depth of the output PNG image
        return sharp(outputBuffer)
          .png({ quality: 100, colors: 256 })
          .toBuffer(async (err, buffer) => {
            if (err) {
              console.error(err);
            } else {
              const tempFilePath = path.join("uploads", `${Date.now()}.png`);
              fs.writeFileSync(tempFilePath, buffer);
              // Upload the temporary file to Cloudinary
              const data = await cloudinary.uploader.upload(tempFilePath, {
                resource_type: "auto",
                public_id: `${Date.now()}`,
              });
    
              // Remove the temporary file
              fs.unlinkSync(tempFilePath);
              res.json({
                public_id: data.public_id,
                url: data.secure_url,
                status:true
              });
            }
          });
      })
  
    }else{
    sharp(req.files.image.path)
      .toFormat("png")
      .toBuffer(async (err, buffer) => {
        if (err) {
          console.error(err);
        } else {
          const tempFilePath = path.join("uploads", `${Date.now()}.png`);
          fs.writeFileSync(tempFilePath, buffer);
          // Upload the temporary file to Cloudinary
          const data = await cloudinary.uploader.upload(tempFilePath, {
            resource_type: "auto",
            public_id: `${Date.now()}`,
          });

          // Remove the temporary file
          fs.unlinkSync(tempFilePath);
          res.json({
            public_id: data.public_id,
            url: data.secure_url,
            status:true
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Image Conversion and Upload Error",
      status:false
    });
  }
};
export const ConverttoGIF = async (req, res) => {
  if (!req.files.image)
    return res.status(400).send("Please Add Image to Convert");
  try {
    sharp(req.files.image.path)
      .toFormat("gif")
      .toBuffer(async (err, buffer) => {
        if (err) {
          console.error(err);
        } else {
          const tempFilePath = path.join("uploads", `${Date.now()}.gif`);
          fs.writeFileSync(tempFilePath, buffer);
          // Upload the temporary file to Cloudinary
          const data = await cloudinary.uploader.upload(tempFilePath, {
            resource_type: "auto",
            public_id: `${Date.now()}`,
          });

          // Remove the temporary file
          fs.unlinkSync(tempFilePath);
          res.json({
            public_id: data.public_id,
            url: data.secure_url,
            status:true
          });
        }
      });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Image Conversion and Upload Error",
      status:false
    });
  }
};
export const ConverttoAVIF = async (req, res) => {
  if (!req.files.image)
    return res.status(400).send("Please Add Image to Convert");
  try {
    sharp(req.files.image.path)
      .toFormat("avif")
      .toBuffer(async (err, buffer) => {
        if (err) {
          console.error(err);
        } else {
          const tempFilePath = path.join("uploads", `${Date.now()}.avif`);
          fs.writeFileSync(tempFilePath, buffer);
          // Upload the temporary file to Cloudinary
          const data = await cloudinary.uploader.upload(tempFilePath, {
            resource_type: "auto",
            public_id: `${Date.now()}`,
          });

          // Remove the temporary file
          fs.unlinkSync(tempFilePath);
          res.json({
            public_id: data.public_id,
            url: data.secure_url,
            status:true
          });
        }
      });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Image Conversion and Upload Error",
      status:false
    });
  }
};
export const ConverttoTIFF = async (req, res) => {
  if (!req.files.image)
    return res.status(400).send("Please Add Image to Convert");
  try {
    sharp(req.files.image.path)
      .toFormat("tiff")
      .toBuffer(async (err, buffer) => {
        if (err) {
          console.error(err);
        } else {
          const tempFilePath = path.join("uploads", `${Date.now()}.tiff`);
          fs.writeFileSync(tempFilePath, buffer);
          // Upload the temporary file to Cloudinary
          const data = await cloudinary.uploader.upload(tempFilePath, {
            resource_type: "auto",
            public_id: `${Date.now()}`,
          });

          // Remove the temporary file
          fs.unlinkSync(tempFilePath);
          res.json({
            public_id: data.public_id,
            url: data.secure_url,
            status:true
          });
        }
      });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Image Conversion and Upload Error",
      status:false
    });
  }
};
export const ConverttoWEBP = async (req, res) => {
  if (!req.files.image)
    return res.status(400).send("Please Add Image to Convert");
  try {
    sharp(req.files.image.path)
      .toFormat("webp")
      .toBuffer(async (err, buffer) => {
        if (err) {
          console.error(err);
        } else {
          const tempFilePath = path.join("uploads", `${Date.now()}.webp`);
          fs.writeFileSync(tempFilePath, buffer);
          // Upload the temporary file to Cloudinary
          const data = await cloudinary.uploader.upload(tempFilePath, {
            resource_type: "auto",
            public_id: `${Date.now()}`,
          });

          // Remove the temporary file
          fs.unlinkSync(tempFilePath);
          res.json({
            public_id: data.public_id,
            url: data.secure_url,
            status:true
          });
        }
      });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Image Conversion and Upload Error",
      status:false
    });
  }
};
export const ConverttoSVG = async (req,res,next) => {
  try {
  if (!req.files.image) return res.status(400).send("Please Add Image to Convert");
  if (req.files.image.type="image/avif")
  {
    next();
  }else if (req.files.image.type="image/webp")
  {
    next();
  }else
  {
    // Read the input PNG,JPG,TIFF,GIF file
    const inputBuffer = fs.readFileSync(req.files.image.path);
    // Convert the to SVG
    potrace.trace(inputBuffer, async (err, svg) => {
      if (err) {
        console.error(err);
      } else {
        // Write the output SVG file
        const tempFilePath = path.join("uploads", `${Date.now()}.svg`);
        fs.writeFileSync(tempFilePath, svg);
        console.log("Image converted to SVG format!");
        // Upload the temporary file to Cloudinary
        const data = await cloudinary.uploader.upload(tempFilePath, {
          resource_type: "auto",
          public_id: `${Date.now()}`,
        });

        // Remove the temporary file
        fs.unlinkSync(tempFilePath);
        res.json({
          public_id: data.public_id,
          url: data.secure_url,
          status:true
        });
      }
    });
  }
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Image Conversion and Upload Error",
      status:false
    });
  }
};
export const ConvertAVIFtoSVG=async(req,res)=>{
  try {
    sharp(req.files.image.path)
      .toFormat("png")
      .toBuffer(async (err, buffer) => {
        if (err) {
          console.error(err);
        } else {
          potrace.trace(buffer, async (err, svg) => {
            if (err) {
              console.error(err);
            } else {
              // Write the output SVG file
              const tempFilePath = path.join("uploads", `${Date.now()}.svg`);
              fs.writeFileSync(tempFilePath, svg);
              console.log("Image converted to SVG format!");
              // Upload the temporary file to Cloudinary
              const data = await cloudinary.uploader.upload(tempFilePath, {
                resource_type: "auto",
                public_id: `${Date.now()}`,
              });
      
              // Remove the temporary file
              fs.unlinkSync(tempFilePath);
              res.json({
                public_id: data.public_id,
                url: data.secure_url,
                status:true
              });
            }
          });
        }
      });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Image Conversion and Upload Error",
      status:false
    });
  }
}
export const ConvertWEBPtoSVG=async(req,res)=>{
  try {
    sharp(req.files.image.path)
      .toFormat("png")
      .toBuffer(async (err, buffer) => {
        if (err) {
          console.error(err);
        } else {
          potrace.trace(buffer, async (err, svg) => {
            if (err) {
              console.error(err);
            } else {
              // Write the output SVG file
              const tempFilePath = path.join("uploads", `${Date.now()}.svg`);
              fs.writeFileSync(tempFilePath, svg);
              console.log("Image converted to SVG format!");
              // Upload the temporary file to Cloudinary
              const data = await cloudinary.uploader.upload(tempFilePath, {
                resource_type: "auto",
                public_id: `${Date.now()}`,
              });
      
              // Remove the temporary file
              fs.unlinkSync(tempFilePath);
              res.json({
                public_id: data.public_id,
                url: data.secure_url,
                status:true
              });
            }
          });
        }
      });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Image Conversion and Upload Error",
      status:false
    });
  }
}
export const ConverttoICO=async(req,res)=>{
  try {
    sharp(req.files.image.path).metadata()
    .then(async({width, height}) => {
      // Determine the size of the square crop
    const size = Math.min(width, height);
    sharp(req.files.image.path)
      .toFormat("png")
      .resize(size,size)
      .toBuffer(async (err, buffer) => {
        if (err) {
          console.error(err);
        } else {
              const ico = await pngToIco(buffer);
              // Write the output SVG file
              const tempFilePath = path.join("uploads", `${Date.now()}.ico`);
              fs.writeFileSync(tempFilePath, ico);
              console.log("Image converted to Ico format!");
              // Upload the temporary file to Cloudinary
              const data = await cloudinary.uploader.upload(tempFilePath, {
                resource_type: "auto",
                public_id: `${Date.now()}`,
              });
      
              // Remove the temporary file
              fs.unlinkSync(tempFilePath);
              res.json({
                public_id: data.public_id,
                url: data.secure_url,
                status:true
              });
        }
      })
    })
    .catch((err) => {
      console.error(err);
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Image Conversion and Upload Error",
      status:false
    });
  }
}

export const ConverttoHEIC=async(req,res)=>{
  try {
    sharp(req.files.image.path)
      .toFormat("png")
      .toBuffer(async (err, buffer) => {
        if (err) {
          console.error(err);
        } else {
          potrace.trace(buffer, async (err, svg) => {
            if (err) {
              console.error(err);
            } else {
              // Write the output SVG file
              const tempFilePath = path.join("uploads", `${Date.now()}.svg`);
              fs.writeFileSync(tempFilePath, svg);
              console.log("Image converted to SVG format!");
              // Upload the temporary file to Cloudinary
              const data = await cloudinary.uploader.upload(tempFilePath, {
                resource_type: "auto",
                public_id: `${Date.now()}`,
              });
      
              // Remove the temporary file
              fs.unlinkSync(tempFilePath);
              res.json({
                public_id: data.public_id,
                url: data.secure_url,
                status:true
              });
            }
          });
        }
      });
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Image Conversion and Upload Error",
      status:false
    });
  }
}