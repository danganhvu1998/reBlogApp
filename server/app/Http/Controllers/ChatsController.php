<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatsController extends Controller
{
    public function test(Request $request){
        return ["result" => $request->token];
    }

    public function testCreate(){
    	return view('chats.testCreate');
    }
}
