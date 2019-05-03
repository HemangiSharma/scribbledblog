<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'test_db');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'w.v;!aX_<<)`QOFeQ5Zt_hUd~z:4aAW6R/x(E#1S,{lqB$8.6*K7jo}Z3j}yt393');
define('SECURE_AUTH_KEY',  '=Is06r2k{iGNbeNY/5^Gk]p5&Z,]O_RGE)c1w-MS*9]u o9m3l9DB:>V,6P]0{2=');
define('LOGGED_IN_KEY',    '3-WKn9G1wN)5jb*Qdj4.m>:h/4yenUgt%^3&wj5&L]LlzT~%G)h!rm!p0)w,`o$b');
define('NONCE_KEY',        'Z!LJ8p F*uevPevm,Q0Am<5(*4sLgTvns0^B]Y<])0%OgKy4H7_C:.rKpDjx#/_+');
define('AUTH_SALT',        '~zVA3:XeAR~!g~rap!9FMBzwAslHCc/+o[c@?-tLG!9Q 5,G82ppJLqPC<,y>svb');
define('SECURE_AUTH_SALT', 'Hh%(:qjPs`*^m` 2M<[/duH>VZ%3]QO yC^,y9TCEX W0j3l7C/>W*iG;J_TyB3c');
define('LOGGED_IN_SALT',   '@j!$Ru8A^8HdV98!P9e=2R/z.&Q6Yq@yi:kF]CJRpd>dgW?r;0p,2YO6>rtdPtVZ');
define('NONCE_SALT',       'HI3T=+Zb7l,YDWE0}~>^,{)QW(JGn1/Kx(6c76W4~<@J0Ju<5lZgHm>Buq3NYQ2O');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'scri';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
