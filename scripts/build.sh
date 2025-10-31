set -a
. ./.env
set +a

npm run build

docker build -t mcarchive-frontend:$IMAGE_VERSION .
echo "✅ Successfully built build Docker Image!"
