package io.getunleash.demo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "unleash")
public class UnleashProperties {

    private Api api = new Api();
    private App app = new App();
    private Feature feature = new Feature();

    public Api getApi() {
        return api;
    }

    public void setApi(Api api) {
        this.api = api;
    }

    public App getApp() {
        return app;
    }

    public void setApp(App app) {
        this.app = app;
    }

    public Feature getFeature() {
        return feature;
    }

    public void setFeature(Feature feature) {
        this.feature = feature;
    }

    public static class Api {
        private String url;
        private String token;

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }

    public static class App {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    public static class Feature {
        private String helloNameMessage;

        public String getHelloNameMessage() {
            return helloNameMessage;
        }

        public void setHelloNameMessage(String helloNameMessage) {
            this.helloNameMessage = helloNameMessage;
        }
    }
}
