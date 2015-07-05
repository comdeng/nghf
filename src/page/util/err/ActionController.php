<?php

class Util_Err_Controller extends PageController
{
	function error_action()
	{
		$this->response->setRaw('error');
	}
	
	function notfound_action()
	{
		$this->response->setRaw('notfound');
	}
}