package io.getunleash.demo;

import io.getunleash.Unleash;
import io.getunleash.UnleashContext;
import io.getunleash.Variant;
import io.getunleash.demo.model.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
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
	public Map<String, Object> generateReport(
		@RequestHeader(value = "X-Unleash-User-Id", required = false) String userId
	) throws InterruptedException {
		// Build Unleash context with userId from the frontend
		UnleashContext context = buildContext(userId);

		// Check kill switch - if enabled, return immediately without slow operation
		boolean killSwitchActive = unleash.isEnabled("disable-slow-reports", context);
		
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
	public Map<String, Object> getRecommendations(
		@RequestHeader(value = "X-Unleash-User-Id", required = false) String userId
	) {
		// Build Unleash context with userId from the frontend
		UnleashContext context = buildContext(userId);

		// Get the variant for movie-recommendations feature flag WITH the userId context
		Variant variant = unleash.getVariant("movie-recommendations", context);
		
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
	 * Builds an UnleashContext with userId from the frontend.
	 * This ensures consistent context usage across all endpoints.
	 *
	 * @param userId the user ID from X-Unleash-User-Id header
	 * @return UnleashContext with userId set if provided
	 */
	private UnleashContext buildContext(String userId) {
		UnleashContext.Builder contextBuilder = UnleashContext.builder();
		if (userId != null && !userId.isEmpty()) {
			contextBuilder.userId(userId);
		}
		return contextBuilder.build();
	}

	/**
	 * Simulates fetching recommendations from a simple recommendation service.
	 * In a real application, this would query a database using JPA/Hibernate.
	 */
	private List<Movie> fetchSimpleRecommendations() {
		// Simulate database query (e.g., movieRepository.findTopRatedMovies())
		return List.of(
			new Movie("tt1375666", "Inception", "2010", "8.8", "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg"),
			new Movie("tt0133093", "The Matrix", "1999", "8.7", "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"),
			new Movie("tt0816692", "Interstellar", "2014", "8.6", "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"),
			new Movie("tt0482571", "The Prestige", "2006", "8.5", "https://image.tmdb.org/t/p/w500/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg"),
			new Movie("tt0407887", "The Departed", "2006", "8.5", "https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg"),
			new Movie("tt0172495", "Gladiator", "2000", "8.5", "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"),
			new Movie("tt0110357", "The Lion King", "1994", "8.5", "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg"),
			new Movie("tt0088763", "Back to the Future", "1985", "8.5", "https://image.tmdb.org/t/p/w500/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg"),
			new Movie("tt2582802", "Whiplash", "2014", "8.5", "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg"),
			new Movie("tt0120689", "The Green Mile", "1999", "8.6", "https://image.tmdb.org/t/p/w500/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg")
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
			new Movie("tt0111161", "The Shawshank Redemption", "1994", "9.3", "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"),
			new Movie("tt0068646", "The Godfather", "1972", "9.2", "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"),
			new Movie("tt0468569", "The Dark Knight", "2008", "9.0", "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"),
			new Movie("tt0110912", "Pulp Fiction", "1994", "8.9", "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg"),
			new Movie("tt0109830", "Forrest Gump", "1994", "8.8", "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"),
			new Movie("tt0137523", "Fight Club", "1999", "8.8", "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"),
			new Movie("tt0167260", "The Lord of the Rings: The Return of the King", "2003", "9.0", "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg"),
			new Movie("tt0060196", "The Good, the Bad and the Ugly", "1966", "8.8", "https://image.tmdb.org/t/p/w500/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg"),
			new Movie("tt0108052", "Schindler's List", "1993", "9.0", "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg"),
			new Movie("tt0050083", "12 Angry Men", "1957", "9.0", "https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg")
		);
	}

}
