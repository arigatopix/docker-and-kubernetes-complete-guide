docker build -t arigatopix/multi-client:latest -t arigatopix/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t arigatopix/multi-server:latest -t arigatopix/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t arigatopix/multi-worker:latest -t arigatopix/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push arigatopix/multi-client:latest
docker push arigatopix/multi-server:latest
docker push arigatopix/multi-worker:latest

docker push arigatopix/multi-client:$SHA
docker push arigatopix/multi-server:$SHA
docker push arigatopix/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=arigatpix/multi-server:$SHA
kubectl set image deployments/client-deployment client=arigatpix/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=arigatpix/multi-worker:$SHA