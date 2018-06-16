<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AuthenticationsController extends Controller
{
    public function register(request $request){
        //Check if acc existed
    	$check = User::where('email', $request->username)->get();
        if(count($check)>0){
            return 0;
        }
        //Register New Acc
        $regis = new User;
    	$regis->name = $request->username;
    	$regis->email = $request->username;
    	$regis->password = $request->password;
        $regis->remember_token = hash('ripemd160', $regis->name.$regis->email.$regis->password);
    	$result = $regis->save();
    	//return view('authentications.serverAccept')->with('result',$result);
        $check = User::where('email', $request->username)->get();
        $check = User::where([['email', $request->username],['password', $request->password]])->get();
        if(count($check)){
            $check[0]->token = $check[0]->remember_token;
        }
        return $check;
    }

    public function login(request $request){
        //Check if acc existed
        $check = User::where([['email', $request->username],['password', $request->password]])->get();
        if(count($check)){
            $check[0]->token = $check[0]->remember_token;
        }
        return $check;
    }

    public function changePassword(request $request){
        $check = User::where([['email', $request->username],['password', $request->password]])->get();
        if(count($check)>0 and $check[0]->id==$request->id){
            User::where('id', $request->id)->update(['name' => $request->userName, 'password' => $request->userPass]);
            $check = User::where('email', $request->username)->first();
            $check->result = 1;
            return $check;
        }
        $obj = new stdClass;
        $obj->result = 0;
        return $obj;
    }

    public function checkToken(request $request){
        $check = User::where('remember_token', $request->token)->get();
        if(count($check)){
            $check[0]->token = $check[0]->remember_token;
        }
        return $check;
    }

    public function create(){
        return view('authentications.create');
    }

}
/*
hash('ripemd160', 'The quick brown fox jumped over the lazy dog.');
$table->increments('id');
$table->string('name');
$table->string('email')->unique();
$table->string('password');
$table->rememberToken();
$table->timestamps();
*/