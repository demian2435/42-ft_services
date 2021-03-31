while true;do
    instan=$(pgrep -f php-)
	[[ "$(echo "$instan")" == '' ]] && kill $(pgrep -f "nginx: master") && exit
	sleep 5s
done