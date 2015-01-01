package ppomo.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import ppomo.domain.table.Mosaic;
import ppomo.service.MosaicService;

@Controller
public class MosaicController {

	@Autowired 
	private MosaicService mosaicService;
	
	@RequestMapping("/result/{uniqueUrl}")
	public String showResult(@PathVariable String uniqueUrl, Model model){
		
		Mosaic theMosaic = mosaicService.showResultOfAMosaic(uniqueUrl);
		
		model.addAttribute("mosaic", theMosaic);
		return "result";
	}
}
