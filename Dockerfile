# Use nginx:alpine as the base image for a lightweight static server
FROM nginx:alpine

# Copy the static website files to the default nginx public directory
COPY . /usr/share/nginx/html

# Expose port 80 to allow external access
EXPOSE 80

# The default command for nginx:alpine is to start nginx
CMD ["nginx", "-g", "daemon off;"]
