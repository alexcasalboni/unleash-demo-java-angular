package io.getunleash.demo.model;

/**
 * Movie entity representing a movie record.
 * In a real application, this would be a JPA entity mapped to a database table.
 */
public class Movie {
    private String title;
    private String year;
    private String rating;

    public Movie(String title, String year, String rating) {
        this.title = title;
        this.year = year;
        this.rating = rating;
    }

    // Getters and setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }
}
