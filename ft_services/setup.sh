minikube stop
minikube delete --all --purge
minikube --driver=docker start
minikube addons enable metrics-server
minikube addons enable dashboard
minikube addons enable metallb
kubectl create configmap grafana-config \
		--from-file=srcs/grafana/extra/datasource.yaml \
		--from-file=srcs/grafana/extra/dashboard.yaml \
		--from-file=srcs/grafana/extra/nginx-dashboard.json \
		--from-file=srcs/grafana/extra/mysql-dashboard.json \
		--from-file=srcs/grafana/extra/phpmyadmin-dashboard.json \
		--from-file=srcs/grafana/extra/wordpress-dashboard.json \
		--from-file=srcs/grafana/extra/influxdb-dashboard.json \
		--from-file=srcs/grafana/extra/telegraf-dashboard.json \
		--from-file=srcs/grafana/extra/ftps-dashboard.json \
		--from-file=srcs/grafana/extra/grafana-dashboard.json

kubectl apply -f srcs/metallb.yaml

eval $(minikube docker-env)
docker build -t influxdb-img srcs/influxdb/. && kubectl apply -f srcs/influxdb.yaml

docker build -t mysql-img srcs/mysql/. && kubectl apply -f srcs/mysql.yaml

docker build -t phpmyadmin-img srcs/phpmyadmin/. && kubectl apply -f srcs/phpmyadmin.yaml

docker build -t wordpress-img srcs/wordpress/. && kubectl apply -f srcs/wordpress.yaml

docker build -t nginx-img srcs/nginx/. && kubectl apply -f srcs/nginx.yaml

docker build -t ftps-img srcs/ftps/. && kubectl apply -f srcs/ftps.yaml

docker build -t grafana-img srcs/grafana/. && kubectl apply -f srcs/grafana.yaml

docker build -t telegraf-img srcs/telegraf/. && kubectl apply -f srcs/telegraf.yaml

#SHELL
#kubectl exec --stdin --tty mysql -- sh

#docker run -it --rm IMAGE COMMAND
