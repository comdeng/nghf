<?php
ini_set('display.errors', true);
error_reporting(E_ALL);

$vendorRoot = dirname(__DIR__).'/vendor/hapn/';

define('_ROOT', dirname(__DIR__));

define('RUN_ROOT', _ROOT.'/public/');

define('FR_ROOT', $vendorRoot.'/HapN/');
define('LIB_ROOT', $vendorRoot.'/lib/');


define('PLUGIN_ROOT', _ROOT.'/src/plugin/');
define('EXLIB_ROOT', _ROOT.'/src/exlib/');
define('PAGE_ROOT', _ROOT.'/src/page/');
define('APP_ROOT', _ROOT.'/src/app/');

define('VIEW_ROOT', _ROOT.'/build/view/');


define('LOG_ROOT', _ROOT.'/log/');
define('CONF_ROOT', _ROOT.'/conf/');
define('TMP_ROOT', _ROOT.'/tmp/');

define('runmode','web');

require_once FR_ROOT.'BaseApp.php';
require_once FR_ROOT.'WebApp.php';
$obj = new WebApp();
$obj->run();
