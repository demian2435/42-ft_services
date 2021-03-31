while true;do
    instan=$(pgrep -f php-)
	[[ "$(echo "$instan")" == '' ]] && kill $(pgrep -f "nginx: master") && exit
	sleep 5s
    instan=$(pgrep -f nginx)
	[[ "$(echo "$instan")" == '' ]] && exit
	sleep 5s
done
