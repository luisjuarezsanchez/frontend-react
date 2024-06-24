# Requisitos previos
1. Tener instalado docker y docker compose, ambos pueden ser verificados con
`docker --version`
`docker-compose --version`

2. Clonar el repositorio de Github

3. Verificar la disponibilidad del puerto 3000, en su defecto reemplaza por algun puerto disponible desde el `docker-compose.yml` 


# Construir el contenedor del frontend
1. Ubicate en la carpeta raiz del proyecto y ejecuta `sudo docker-compose build` para construir el contenedor
2. Seguido ejecuta `sudo docker-compose up -d` para levantar el contenedor y ejecutarlo en modo daemon. asegurate de que al colocar el comando `dir` veas el archivo `docker-compose.yml`


# Verifica el estado `up` del contenedor
En una terminal coloca `sudo docker ps -a` para ver los contenedores activos y tienes que ver uno llamada `front-end-react_frontend_1`

# Accede a tu navegador
Verifica el despliegue de la aplicacion en `localhost:3000` y tendrias que ver la aplicacion desplegada.