minikube stop
minikube delete --all --purge
minikube --driver=docker start
minikube addons enable metrics-server
minikube addons enable dashboard
minikube addons enable metallb
kubectl apply -f srcs/metallb.yaml
eval $(minikube docker-env)

docker build -t nginx-img srcs/nginx/.
kubectl apply -f srcs/nginx.yaml