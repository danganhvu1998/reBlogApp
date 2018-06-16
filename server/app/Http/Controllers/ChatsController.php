<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatsController extends Controller
{
    public function test(Request $request){
    	$obj = new stdClass;
        $obj->result = 0;
        return $obj;
    }

    public function testCreate(){
    	return view('chats.testCreate');
    }
}
