package ppomo.library;

import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.Size;
import org.opencv.highgui.Highgui;
import org.opencv.imgproc.Imgproc;

public class GaussianBlurFilter {
	
	public void adaptFilter(String fileName, String destFileName) {
		try {
			System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
			Mat source = Highgui.imread(fileName, Highgui.CV_LOAD_IMAGE_COLOR);
			Mat destination = new Mat(source.rows(), source.cols(), source.type());
			Imgproc.GaussianBlur(source, destination, new Size(45, 45), 0);
			Highgui.imwrite(destFileName, destination);
		} catch (Exception e) {
			System.out.println("Error: " + e.getMessage());
		}
	}
}
