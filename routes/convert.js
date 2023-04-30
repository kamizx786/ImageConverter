import express from "express"
const router=express.Router();
import {ConvertAVIFtoSVG, ConvertWEBPtoSVG, ConverttoAVIF, ConverttoGIF, ConverttoICO, ConverttoJPG, ConverttoPNG, ConverttoSVG, ConverttoTIFF, ConverttoWEBP} from "../controllers/convert";
import formidable from "express-formidable";

router.post("/convert-to-jpg",formidable({maxFileSize: 5 * 1024 * 1024,
    multiples: true,
    maxFieldsSize: 50 * 1024 * 1024}),ConverttoJPG);
router.post("/convert-to-png",formidable({maxFileSize: 5 * 1024 * 1024,
    multiples: true,
    maxFieldsSize: 50 * 1024 * 1024}),ConverttoPNG);
router.post("/convert-to-gif",formidable({maxFileSize:5*1024*1024}),ConverttoGIF);
router.post("/convert-to-avif",formidable({maxFileSize:5*1024*1024}),ConverttoAVIF);
router.post("/convert-to-tiff",formidable({maxFileSize:5*1024*1024}),ConverttoTIFF);
router.post("/convert-to-webp",formidable({maxFileSize:5*1024*1024}),ConverttoWEBP);
router.post("/convert-to-svg",formidable({maxFileSize:5*1024*1024}),ConverttoSVG,ConvertAVIFtoSVG,ConvertWEBPtoSVG);
router.post("/convert-to-ico",formidable({maxFileSize:5*1024*1024}),ConverttoICO);

module.exports=router;