<?php

class Index_Controller extends PageController
{
	
	function index_action()
	{
		$this->set('list', [
			[
				'url' => 'ss',
				'name' => 'aa',
			],
			[
				'url' => 'http://tech.sina.com.cn',
				'name' => 'sina',
			]
		]);
		$this->setView('index/index');
	}
}