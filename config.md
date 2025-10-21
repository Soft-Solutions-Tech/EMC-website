# ======================================================

# HTTPS server for EMC Energy

# ======================================================

server {
listen 443 ssl;
server_name www.emc-egypt.net emc-egypt.net www.emc-energy.net;

    # SSL settings (Certbot-managed)
    ssl_certificate /etc/letsencrypt/live/emc-egypt.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/emc-egypt.net/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Redirect non-www to www
    if ($host = emc-egypt.net) {
        return 301 https://www.emc-egypt.net$request_uri;
    }

    # Serve Decap CMS (static)
    location /admin {
        root /var/www/nextjs/public;
        index index.html;
        try_files $uri $uri/ /admin/index.html;
    }

    # Proxy all other requests to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}

# ======================================================

# HTTPS server for EMC Energy (new)

# ======================================================

server {
listen 443 ssl;
server_name emcenergy.org www.emcenergy.org;

    # SSL settings (Certbot-managed)
    ssl_certificate /etc/letsencrypt/live/emcenergy.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/emcenergy.org/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Redirect non-www to www for all domains
    if ($host = emcenergy.org) {
        return 301 https://www.emcenergy.org$request_uri;
    }
    if ($host = emc-egypt.net) {
        return 301 https://www.emc-egypt.net$request_uri;
    }
    if ($host = emc-energy.net) {
        return 301 https://www.emc-energy.net$request_uri;
    }

    # Fix content-type for YAML files (e.g., config.yml)
    location ~ \.yml$ {
        types {}
        add_header Content-Type text/yaml always;
    }

    # Serve Decap CMS (static)
    location /admin {
        root /var/www/nextjs/public;
        index index.html;
        try_files $uri $uri/ /admin/index.html;
    }

    # Proxy all other requests to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}

# ======================================================

# HTTP to HTTPS redirect (for all domains)

# ======================================================

server {
listen 80;
server_name www.emc-egypt.net emc-egypt.net www.emc-energy.net emc-energy.net www.emcenergy.org emcenergy.org;

    # Redirect all HTTP to HTTPS
    return 301 https://$host$request_uri;

}
