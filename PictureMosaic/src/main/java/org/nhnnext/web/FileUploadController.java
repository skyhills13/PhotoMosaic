package org.nhnnext.web;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

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

	private static final Logger logger = LoggerFactory
			.getLogger(FileUploadController.class);
	private static final String ATTACHMENT_ROOT_DIR = "/Users/soeunpark/Documents/workspace/sts/PictureMosaic/PictureMosaic/webapp/images";
	private static final String ATTACHMENT_ROOT_DIR_REMOTE = "";

    //URL이름이 'select' 보다 더 구체적일 필요는 없는지 고민.
	@RequestMapping("/select")
	public String select() {
        //실제 서비스 운영 환경에서는 이런 debug코드가 찍히지 않게 하려면 어떻게 하겠죠? (잘 몰라서)
		logger.debug("into select page");
		return "uploadMultiple";
	}

	@RequestMapping(value = "/uploadMultipleFile", method = RequestMethod.POST)
    public @ResponseBody String uploadMultipleFileHandler(@RequestParam("file") MultipartFile[] files) {
        String message = "";
        //controller 에서는 여러 URL 라이팅을 하는데 하나의 메서드가 좀 긴 내용을 담고 있는 건 아닌지. 
        //별도 메서드로 아래 for문 하위 내용을 분리해는 것도 가능한지 살펴보죠.
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            UUID pictureUniqueKey = UUID.randomUUID();
            if (file.isEmpty()) {
                //이런 메시지도 따로 메시지만 묶어두고 불러서 사용하면 좋겠음.
            	return "You failed to upload " + file.getOriginalFilename() + " because the file was empty.";
            }
            logger.debug(pictureUniqueKey.toString());
            String uniqueName = pictureUniqueKey.toString();
            String originalName = file.getOriginalFilename();
            try {
                byte[] bytes = file.getBytes();
 
                // Create the directory to store file
                File dir = new File(ATTACHMENT_ROOT_DIR);
                if (!dir.exists()) {
                	dir.mkdirs();
                }
 
                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath() + File.separator + originalName);
                BufferedOutputStream stream = new BufferedOutputStream( new FileOutputStream(serverFile) );
                stream.write(bytes);
                stream.close();
 
                // 이런 메시지도 분리하면 좋겠음
                logger.info("Server File Location=" + serverFile.getAbsolutePath());
                message = message + "You successfully uploaded file=" + originalName + "<br />";
            } catch (Exception e) {
                //오류가 발생하면 logger를 통해서 저장핦 필요는 없는것인지? (이것도 전 잘 모르지만)
                return "You failed to upload " + originalName + " => " + e.getMessage();
            }
        }
        return message;
    }

	@RequestMapping(value = "/remove", method = RequestMethod.GET)
	public String delete(String name) {
		File imagesDir = new File(ATTACHMENT_ROOT_DIR);
		File targetFile = new File(imagesDir.getAbsolutePath() + File.separator
				+ name);

		// TODO exception handling
		targetFile.delete();
		return name;
	}
}
