package com.fullstack.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    @Value("${SPRING_DATASOURCE_URL:${DB_URL:}}")
    private String rawUrl;

    @Value("${spring.datasource.username:${DB_USERNAME:postgres}}")
    private String defaultUsername;

    @Value("${spring.datasource.password:${DB_PASSWORD:}}")
    private String defaultPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        String jdbcUrl;
        String username = defaultUsername;
        String password = defaultPassword;

        if (rawUrl != null && !rawUrl.isBlank()) {
            if (rawUrl.startsWith("jdbc:")) {
                jdbcUrl = rawUrl;
            } else if (rawUrl.startsWith("postgres://") || rawUrl.startsWith("postgresql://")) {
                try {
                    URI uri = new URI(rawUrl.replace("postgres://", "postgresql://"));
                    String host = uri.getHost();
                    int port = uri.getPort() == -1 ? 5432 : uri.getPort();
                    String path = uri.getPath(); // e.g. /campusconnect
                    jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;

                    if (uri.getUserInfo() != null) {
                        String[] userInfo = uri.getUserInfo().split(":");
                        username = userInfo[0];
                        if (userInfo.length > 1) {
                            password = userInfo[1];
                        }
                    }
                } catch (Exception e) {
                    jdbcUrl = rawUrl.replaceFirst("^postgres(ql)?://", "jdbc:postgresql://");
                }
            } else {
                jdbcUrl = rawUrl;
            }
        } else {
            jdbcUrl = "jdbc:postgresql://localhost:5432/campusconnect";
        }

        return DataSourceBuilder.create()
                .driverClassName("org.postgresql.Driver")
                .url(jdbcUrl)
                .username(username)
                .password(password)
                .build();
    }
}
