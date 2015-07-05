<?php

class Index_Controller extends PageController
{
	
	function index_action()
	{
		$this->set('city', [
				'name' => '北京',
				'city_id' => 110900,
				'mark' => 'bj',
		]);
		
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
		
		$this->set('cities', [
			[
				'city_id' => 110900,
				'mark' => 'bj',
				'name' => '北京',
			],
			[
				'city_id' => 310900,
				'mark' => 'sh',
				'name' => '上海',
			],
	
		]);
		
		$this->set('ads', [
			[
				'src' => '//2.tthunbohui.cn/fill/666/662/66666211255514898510-640X200.jpg',
				'title' => '广告1',
				'link'=> '',
			],
			[
				'src'=> '//2.tthunbohui.cn/fill/216/446/21644634132266613331-640X200.jpg',
				'title'=> '广告2',
				'link'=> '',
			],
			[
				'src'=>'//3.tthunbohui.cn/fill/660/568/66056873269916898310-640X200.jpg',
				'title'=>'广告3',
				'link'=> '',
			]
		]);
		
		$this->set('cates', [
			[
				'link' => '',
				'name' => '订婚宴',
				'logo' => '//2.hapn.cc/origin/137/648/13764867646563992861.png',
			],
			[
				'link' => '',
				'name' => '拍婚照',
				'logo' => '//2.hapn.cc/origin/461/129/46112983650384913501.png',
			],
		]);
		$this->setView('index/index');
	}
}