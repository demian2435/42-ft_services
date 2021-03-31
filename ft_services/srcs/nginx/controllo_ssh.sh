while true;do
    instan=$(pgrep -f sshd:)
	[[ "$(echo "$instan")" == '' ]] && kill $(pgrep -f "nginx: master") && exit
	sleep 5s
done