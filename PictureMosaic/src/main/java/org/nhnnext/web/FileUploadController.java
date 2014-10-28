package org.nhnnext.web;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FileUploadController {
	
	private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);
	private static final String ATTACHMENT_ROOT_DIR_LOCAL = "/Users/soeunpark/Documents/workspace/sts/PictureMosaic/PictureMosaic/webapp/images";
	private static final String ATTACHMENT_ROOT_DIR_REMOTE = ""; 
	
	@RequestMapping("/select")
	public String select(){
		logger.debug("into select page");
		return "uploadMultiple";
	}
	
	/**
     * Upload single file using Spring Controller
     */
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    public @ResponseBody String uploadFileHandler(@RequestParam("name") String name,
            @RequestParam("file") MultipartFile file) {
        
    	if (file.isEmpty()) {
        	return "You failed to upload " + name + " because the file was empty.";
        } try {
        	byte[] bytes = file.getBytes();
        	
        	// Creating the directory to store file
        	//TODO change ATTACHMENT_ROOT_DIR to ATTACHMENT_ROOT_DIR_REMOTE WHEN DISTRIBUTING 
        	File dir = new File(ATTACHMENT_ROOT_DIR_LOCAL);
        	if (!dir.exists()) {
        		dir.mkdirs();
        	}
        	
        	// Create the file on server
        	File serverFile = new File(dir.getAbsolutePath()
        			+ File.separator + name);
        	BufferedOutputStream stream = new BufferedOutputStream(
        			new FileOutputStream(serverFile));
        	stream.write(bytes);
        	stream.close();
        	
        	logger.info("Server File Location="
        			+ serverFile.getAbsolutePath());
        	
        	return "You successfully uploaded file=" + name;
        } catch (Exception e) {
        	return "You failed to upload " + name + " => " + e.getMessage();
        }
    }
 
    /**
     * Upload multiple file using Spring Controller
     */
    @RequestMapping(value = "/uploadMultipleFile", method = RequestMethod.POST)
    public @ResponseBody String uploadMultipleFileHandler(@RequestParam("name") String[] names,
            @RequestParam("file") MultipartFile[] files) {
 
        if (files.length != names.length) {
        	return "Mandatory information missing";
        }
        
        String message = "";
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            String name = names[i];
            try {
                byte[] bytes = file.getBytes();
 
                // Create the directory to store file
                File dir = new File(ATTACHMENT_ROOT_DIR_LOCAL);
                if (!dir.exists()) {
                	dir.mkdirs();
                }
 
                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath() + File.separator + name);
                BufferedOutputStream stream = new BufferedOutputStream( new FileOutputStream(serverFile) );
                stream.write(bytes);
                stream.close();
 
                logger.info("Server File Location=" + serverFile.getAbsolutePath());
                message = message + "You successfully uploaded file=" + name + "<br />";
            } catch (Exception e) {
                return "You failed to upload " + name + " => " + e.getMessage();
            }
        }
        return message;
    }
}
