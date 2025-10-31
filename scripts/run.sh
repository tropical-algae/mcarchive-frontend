
IMAGE_VERSION="0.1"

CONTAINER_MOUNT="/mnt/docker/mcarchive/nginx.conf"
CONTAINER_PORT=23456

docker run -itd --name mcarchive-frontend \
--restart=unless-stopped \
-p $CONTAINER_PORT:80 \
mcarchive-frontend:$IMAGE_VERSION
