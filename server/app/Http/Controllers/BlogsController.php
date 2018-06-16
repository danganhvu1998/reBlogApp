<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Blog;
use App\User;

class BlogsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $blogs = Blog::orderBy('created_at','desc')->paginate(10);
        $users = User::all();
        $BLOGS = array();
        foreach ($blogs as $blog) {
            $userName = User::where('id', $blog->user_id)->get()[0]->name;
            $blog->created_by = $userName;
            array_push($BLOGS, $blog);
        }
        return $BLOGS;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {   
        return view('blogs.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        return $request;
        $post = new Blog;
        $post->title = $request->title;
        $post->body = $request->body;
        $post->user_id = $request->user_id;
        $result = $post->save();
        return 1;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $blogs = Blog::where('user_id',$id)->orderBy('created_at','desc')->get();
        $users = User::all();
        $userName = User::where('id', $id)->get()[0]->name;
        $BLOGS = array();
        foreach ($blogs as $blog) {
            $blog->created_by = $userName;
            array_push($BLOGS, $blog);
        }
        return $BLOGS;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
