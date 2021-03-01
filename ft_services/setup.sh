#minikube stop
#minikube delete --all --purge
#minikube --driver=docker start
minikube addons enable metrics-server
minikube addons enable dashboard
minikube addons enable metallb
kubectl apply -f srcs/metallb.yaml
eval $(minikube docker-env)

#docker build -t nginx-img srcs/nginx/.
#kubectl apply -f srcs/nginx.yaml

#docker build -t mysql-img srcs/mysql/.
#kubectl apply -f srcs/mysql.yaml

#docker build -t phpmyadmin-img srcs/phpmyadmin/.
#kubectl apply -f srcs/phpmyadmin.yaml

#docker build -t wordpress-img srcs/wordpress/.
#kubectl apply -f srcs/wordpress.yaml

docker build -t ftps-img srcs/ftps/.
kubectl apply -f srcs/ftps.yaml