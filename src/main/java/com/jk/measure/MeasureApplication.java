package com.jk.measure;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
@MapperScan("com.jk.**.mapper")
public class MeasureApplication {

	public static void main(String[] args) {
		SpringApplication.run(MeasureApplication.class, args);
	}
}
