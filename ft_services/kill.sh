#kubectl exec deploy/ftps -- pkill vsftpd OK
#kubectl exec deploy/nginx -- pkill nginx OK
#kubectl exec deploy/nginx -- pkill sshd KO
#kubectl exec deploy/mysql -- pkill mysql OK
#kubectl exec deploy/phpmyadmin -- pkill php OK
kubectl exec deploy/wordpress -- pkill php
