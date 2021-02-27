mysql_install_db --user=root --basedir=/usr --datadir=/var/lib/mysql
mysqld --user=root --skip_networking=0 --init-file=/config.sql