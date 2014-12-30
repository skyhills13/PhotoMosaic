package org.nhnnext.support;


public class Constants {
	public static final String UPLOAD_FAIL_MESSAGE = "fail to upload the photo :";
	public static final String UPLOAD_SUCCESS_MESSAGE = "successfully upload the photo : ";
	public static final String WRONG_FILE = "No extension for file : ";
	public static final String NOT_IMAGE = "Not a known image file: ";
	public static final String MOVE_FAIL_MESSAGE ="fail to move attachedFile";
	public static final String NOT_EXISTING_MEMBER ="존재하지 않는 사용자입니다.";
	public static final String ALREADY_EXISTING_MEMBER = "이미 존재하는 사용자입니다";
	public static final String WRONG_PASSWORD = "비밀번호가 틀립니다.";
	
	//코드에 넣지 않아. 설정파일에 넣어. spring value injection도 가능하니까. 
	//설정파일에 있는 값을 객체의 속성에 넣어벌수도 있어. property파일에 넣어.
	//어쨌든 코드에 넣는 것은 좋지 않아. 
//	public static final String ATTACHMENT_ROOT_DIR = "/Users/soeunpark/Documents/workspace/sts/PhotoMosaic/PhotoMosaic/webapp/images";
	public static final String ATTACHMENT_ROOT_DIR = "/root/Applications/tomcat/webapps/ROOT/images";
//	public static final String ATTACHMENT_ROOT_DIR = "/Users/jooheekim/Documents/workspace/PhotoMosaic/PhotoMosaic/webapp/images";
//	public static final String ATTACHMENT_ROOT_DIR =  "/Users/min/dev/FinalProject/Git Repository/PhotoMosaic/webapp/images";
	public static final String MOSAIC_FILE_EXTENSION = "jpg";
	public static final int MAX_COUNT_OF_PHOTOS_CONSISTING_MOSAIC = 8;

}
