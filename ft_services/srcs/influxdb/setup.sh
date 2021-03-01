/usr/sbin/influxd
influx -execute "CREATE DATABASE grafana"
influx -execute "CREATE USER d2435 WITH PASSWORD 'd2435'"
influx -execute "GRANT ALL ON grafana TO d2435"