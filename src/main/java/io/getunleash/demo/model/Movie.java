package io.getunleash.demo.model;

/**
 * Movie entity representing a movie record.
 * In a real application, this would be a JPA entity mapped to a database table.
 */
public class Movie {
    private String id;
    private String title;
    private String year;
    private String rating;
    private String imageUrl;

    public Movie(String id, String title, String year, String rating, String imageUrl) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.rating = rating;
        this.imageUrl = imageUrl;
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
