import jdk.nashorn.internal.ir.annotations.Reference;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class HomeController {

	@RequestMapping("/")
	public void home(){
		return "index";
	}

}
