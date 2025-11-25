package io.getunleash.demo;

import io.getunleash.Unleash;
import io.getunleash.demo.config.UnleashProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DemoApplication {

	@Autowired
	private Unleash unleash;

	@Autowired
	private UnleashProperties unleashProperties;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@GetMapping("/test")
	public Map<String, String> test() {
		// Check if the feature flag is enabled
		boolean isEnabled = unleash.isEnabled(unleashProperties.getFeature().getHelloNameMessage());
		
		String message = isEnabled ? "Hello Allianz" : "hello world";
		
		return Map.of("message", message);
	}

}
