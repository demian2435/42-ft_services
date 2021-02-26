kubectl delete -n default deployment nginx
kubectl delete -n default service nginx
kubectl delete --all pods --namespace=default