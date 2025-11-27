package io.getunleash.demo;

import io.getunleash.Unleash;
import io.getunleash.Variant;
import io.getunleash.demo.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class DemoApplication {

	@Autowired
	private Unleash unleash;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@GetMapping("/api/reports")
	public Map<String, Object> generateReport() throws InterruptedException {
		// Check kill switch - if enabled, return immediately without slow operation
		boolean killSwitchActive = unleash.isEnabled("disable-slow-reports");
		
		if (killSwitchActive) {
			// Kill switch is active - return immediately without sleeping
			return Map.of(
				"result", 42,
				"cached", true,
				"message", "Returned from cache (kill switch active)"
			);
		}
		
		// Kill switch is OFF - perform the slow operation
		Thread.sleep(5000); // 5 seconds delay
		
		return Map.of("result", 42);
	}

	@GetMapping("/api/recommendations")
	public Map<String, Object> getRecommendations() {
		// Get the variant for movie-recommendations feature flag
		Variant variant = unleash.getVariant("movie-recommendations");
		
		// Check if the feature is enabled
		if (!variant.isEnabled()) {
			// Feature is disabled - return 404
			throw new ResponseStatusException(
				HttpStatus.NOT_FOUND, 
				"Recommendations feature is not available"
			);
		}
		
		String algorithm = variant.getName();
		List<Movie> movies;
		
		// Return different recommendations based on the variant
		if ("v2-ml".equals(algorithm)) {
			// V2: ML-based algorithm (more sophisticated recommendations)
			movies = fetchMlBasedRecommendations();
		} else {
			// V1: Simple algorithm (basic recommendations) - default
			movies = fetchSimpleRecommendations();
		}
		
		return Map.of(
			"movies", movies,
			"algorithm", algorithm
		);
	}
	
	/**
	 * Simulates fetching recommendations from a simple recommendation service.
	 * In a real application, this would query a database using JPA/Hibernate.
	 */
	private List<Movie> fetchSimpleRecommendations() {
		// Simulate database query (e.g., movieRepository.findTopRatedMovies())
		return List.of(
			new Movie("Inception", "2010", "8.8"),
			new Movie("The Matrix", "1999", "8.7"),
			new Movie("Interstellar", "2014", "8.6"),
			new Movie("The Prestige", "2006", "8.5")
		);
	}
	
	/**
	 * Simulates fetching recommendations from an ML-based recommendation engine.
	 * In a real application, this would call a machine learning service or model
	 * and then fetch the Movie entities from the database.
	 */
	private List<Movie> fetchMlBasedRecommendations() {
		// Simulate ML service call + database lookup (e.g., mlService.recommend() then movieRepository.findAllById())
		return List.of(
			new Movie("The Shawshank Redemption", "1994", "9.3"),
			new Movie("The Godfather", "1972", "9.2"),
			new Movie("The Dark Knight", "2008", "9.0"),
			new Movie("Pulp Fiction", "1994", "8.9"),
			new Movie("Forrest Gump", "1994", "8.8")
		);
	}

}
