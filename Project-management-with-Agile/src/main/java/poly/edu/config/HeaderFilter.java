package poly.edu.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class HeaderFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        
        // Remove or override restrictive headers that block cross-origin resources
        httpResponse.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
        httpResponse.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
        httpResponse.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        
        chain.doFilter(request, response);
    }
}
