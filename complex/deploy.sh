docker biuld -t arigatopix/multi-client -f ./client/Dockerfile ./client
docker biuld -t arigatopix/multi-server -f ./server/Dockerfile ./server
docker biuld -t arigatopix/multi-worker -f ./worker/Dockerfile ./worker
docker push arigatopix/multi-client
docker push arigatopix/multi-server
docker push arigatopix/multi-worker
kubctl apply -f k8s
kubctl set image deployments/server-deployment server=arigatpix/multi-server