package com.jk.measure;

import com.jk.measure.controller.MeasureController;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.ShardedJedisPool;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MeasureApplicationTests {

	private MockMvc mvc;

	@Autowired
	private ShardedJedisPool jedisPool;

	@Before
	public void setUp() throws Exception{
		mvc = MockMvcBuilders.standaloneSetup(new MeasureController()).build();
	}

	@Test
	public void contextLoads() throws Exception {
		RequestBuilder request;
		request = post("/me/measure/rhyData")
				.param("year", "2018")
				.param("month", "1")
				.param("day", "31")
				.param("time", "18:24:17")
				.param("lng", "103.391000")
				.param("sex", "0");
		mvc.perform(request)
		   .andExpect(status().isOk());
	}

	@Test
	public void jedisPoolTest(){
		ShardedJedis shardedJedisPool = jedisPool.getResource();
		String test = shardedJedisPool.set("test", "123456");
		System.out.println(test);
		String val = shardedJedisPool.get("test");
		System.out.println(val);
	}

}
