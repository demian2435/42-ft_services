#kubectl delete -n default deployment nginx
#kubectl delete -n default deployment wordpress
#kubectl delete -n default deployment phpmyadmin
#kubectl delete -n default deployment mysql
#kubectl delete -n default service nginx
#kubectl delete -n default service wordpress
#kubectl delete -n default service phpmyadmin
#kubectl delete -n default service mysql
#kubectl delete --all pods --namespace=default

#kubectl delete -f srcs/metallb.yaml 
#kubectl delete -f srcs/mysql.yaml 
kubectl delete -f srcs/nginx.yaml
#kubectl delete -f srcs/phpmyadmin.yaml
#kubectl delete -f srcs/wordpress.yaml
#kubectl delete -f srcs/ftps.yaml
#kubectl delete -f srcs/influxdb.yaml

#docker rm $(docker ps -a -f status=exited -f status=created -q)
#docker rmi $(docker images -a -q)