package com.ge.transportation.oasisdemo.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.ErrorPage;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.instrument.classloading.InstrumentationLoadTimeWeaver;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.ge.transportation.oasisdemo.service.util.ContainerUtil;

@SpringBootApplication
@EnableScheduling
@EnableAutoConfiguration
public class Application {
    @Autowired
    JdbcTemplate jdbcTemplate;
    private static Properties yardProp = new Properties();
    
	static {
		InputStream is = null;
		try {
			is = ContainerUtil.class.getClassLoader().getResourceAsStream("yard.properties");
			yardProp.load(is);
			if (is != null) is.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		yardProp.list(System.out);
	}
    
	public static void main(String[] args) {
		Logger logger = LoggerFactory.getLogger(Application.class);
		logger.debug("In Application");
		SpringApplication.run(Application.class, args);
	}
	
	@Bean
	public InstrumentationLoadTimeWeaver loadTimeWeaver()  throws Throwable {
	    InstrumentationLoadTimeWeaver loadTimeWeaver = new InstrumentationLoadTimeWeaver();
	    return loadTimeWeaver;
	}
	
	@Bean
	public EmbeddedServletContainerFactory servletContainer() {
	    TomcatEmbeddedServletContainerFactory factory = new TomcatEmbeddedServletContainerFactory();
	    String oasisServicePort = yardProp.getProperty("oasisServicePort");
	    factory.setPort(Integer.parseInt(oasisServicePort));
	    factory.setSessionTimeout(10, TimeUnit.MINUTES);
	    // factory.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/notfound.html"));
	    return factory;
	}
}
