package io.getunleash.demo.config;

import io.getunleash.DefaultUnleash;
import io.getunleash.Unleash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UnleashConfiguration {

    @Autowired
    private UnleashProperties unleashProperties;

    @Bean
    public Unleash unleash() {
        io.getunleash.util.UnleashConfig config = io.getunleash.util.UnleashConfig.builder()
                .appName(unleashProperties.getApp().getName())
                .instanceId("allianz-demo-instance")
                .unleashAPI(unleashProperties.getApi().getUrl())
                .apiKey(unleashProperties.getApi().getToken())
                .build();

        return new DefaultUnleash(config);
    }
}
