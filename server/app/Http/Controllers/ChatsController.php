<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatsController extends Controller
{
    public function test(Request $request){
        return ["result" => 0];
    }

    public function testCreate(){
    	return view('chats.testCreate');
    }
}
