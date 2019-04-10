Compose is a tool for defining and running multi-container Docker applications.

[Docs](https://docs.docker.com/compose/)

## Features:
* Multiple isolated environments on a single host
* Preserve volume data when containers are created
* Only recreate containers that have changed
* Variables and moving a composition between environments

## CheatSheet:
**docker-compose --version** // Show the Docker-Compose version information
**docker-compose up -d** // Create and start containers
**docker-compose down**  // Stop and remove containers, networks, images, and volumes
**docker-compose logs {container}** // View output from containers

## docker-compose.yaml tips
* use 'yes' to instead of true
* use space as split to set a string array
* use secrets to handle password
