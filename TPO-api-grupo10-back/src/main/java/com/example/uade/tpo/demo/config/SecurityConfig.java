package com.example.uade.tpo.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

import com.example.uade.tpo.demo.entity.Role;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req -> req
                                .requestMatchers("/api/v1/auth/**").permitAll()
                                .requestMatchers("/error/**").permitAll()
                                .requestMatchers("/api/cuentas/id").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/cuentas/username").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/cuentas/update").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/cuentas/delete").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/carritos/id").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/descuentos/titulo/{code}").permitAll()
                                .requestMatchers("/api/descuentos").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/descuentos/add-descuento").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/descuentos/delete/{id}").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/descuentos").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/descuentos/update/{id}").hasAuthority(Role.ADMIN.name())




                                .requestMatchers("/api/facturas/**").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/pedidos").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/vinilos/add-vinilo").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/vinilos/update/{id}").hasAuthority(Role.ADMIN.name())
                                .requestMatchers("/api/vinilos/delete/{id}").hasAuthority(Role.ADMIN.name())
                                .anyRequest().permitAll()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // origen frontend
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
