<?php
/*
 ** 权限管理
 */
header("Content-Type: text/html; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: x-requested-with");
header("Access-Control-Allow-Methods: GET, POST, GET, OPTIONS");
date_default_timezone_set('PRC');
/*
 ** 具体详解看接口 权限管理.json
 */
$d = '{
	"errno":"0",
	"error":"",
	"data":{
		"bind": "0",
		"roam": "1",
		"subscribe": "0",
		"card": "1",
		"online": "1"
	}
}';

$c = '{
	"errno":"0",
	"error":""
}';
//获取角色组列表
if ($_GET['action'] == 'select') {
	if (is_null(json_decode($d))) {
		echo '{"msg":"json结构错误"}';
		exit();
	}
	echo $d;
	exit();
}

//获取菜单
if ($_GET['action'] == 'bind') {
	if (is_null(json_decode($c))) {
		echo '{"msg":"json结构错误"}';
		exit();
	}
	echo $c;
	exit();
}

//根据点击的某角色 查看权限
if ($_GET['action'] == 'roam') {
	if (is_null(json_decode($c))) {
		echo '{"msg":"json结构错误"}';
		exit();
	}
	echo $c;
	exit();
}

if ($_GET['action'] == 'edit') {
	echo '{"errno":"0","error":"json结构错误"}';
	exit();
}

if ($_GET['action'] == 'add') {

	echo '{"errno":"0","error":"json结构错误"}';
	exit();
}

if ($_GET['action'] == 'del') {

	echo '{"errno":"0","error":"json结构错误"}';
	exit();
}
