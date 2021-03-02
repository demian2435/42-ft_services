<?php
define( 'DB_NAME', 'wordpress' );
define( 'DB_USER', 'd2435' );
define( 'DB_PASSWORD', 'd2435' );
define( 'DB_HOST', 'mysql' );
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );
define( 'FS_METHOD', 'direct' );
define('AUTH_KEY',         '#opJS@q3wCB(J<n3?49lP@4ta.+;?}9rCbv-xpGmukgt.bN[#2TYvI+#V Q9R,|~');
define('SECURE_AUTH_KEY',  'NADE q|xJe+A #l{_0k@k?l!Vt1,=G;A hvZ8p3k+At#;oG@Uk[gY1v.a8hB -]M');
define('LOGGED_IN_KEY',    '<fB,8bf7dzFemTKT.9:OJ<18~IDf7i|BJ(sX3vdOC!q[_~uCSrcY4h&05~).PS|=');
define('NONCE_KEY',        '[R=>u~}e#/f=5UCOV^nPBh3|gq1 qvl2ugAP}J[4Gj=$^}~L[_RE#E(!+`-?e@|*');
define('AUTH_SALT',        'h}QA$61Ve<VCrZBi>hB  dxCj&04GXdX@_[U/ccZ#ItJi]0!Vw/h=:ku~}-XL@Qw');
define('SECURE_AUTH_SALT', 'PR+F67^9cM]aaGH_AM1Mr_yj:ZsId1{8?8=RGqmFNV~,+lIJ(Ki}hh>Wf:Wf;Syd');
define('LOGGED_IN_SALT',   'Lh1j:_Jzj#Y-&AAXm(n=2n>{@fdJz11Fk#Mu[Pn}GJmkT`hPbpB0y#OZt12KYHuP');
define('NONCE_SALT',       'FSL=n/-H?80t<]n?f9V4dTSV2`jIp,/D*+uNjVr5|%kC>Fq%lp+-<5[6EYF?Qq;K');
$table_prefix = 'wp_';
define( 'WP_DEBUG', false );
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}
require_once ABSPATH . 'wp-settings.php';
