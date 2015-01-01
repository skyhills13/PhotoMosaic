package ppomo.dao;

import javax.annotation.PostConstruct;

import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

public abstract class DaoTemplate extends JdbcDaoSupport {

	public DaoTemplate() {
	}

	@PostConstruct
	public void initialize() {
		ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
		populator.addScript(new ClassPathResource("photomosaic.sql"));
		DatabasePopulatorUtils.execute(populator, getDataSource());
		logger.debug("database initialize success!");
	}
}