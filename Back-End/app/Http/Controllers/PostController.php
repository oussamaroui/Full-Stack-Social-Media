<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        // $posts = Post::withCount(['likes' => function ($query) {
        //     $query->where('like_value', 1);
        // }])->with('user')->get();

        $posts = Post::with(['likes', 'user'])->get();

        return response()->json($posts);
    }

    public function allLikes()
    {
        return response()->json(Like::all());
    }

    public function like(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'post_id' => 'required|exists:posts,id',
            'like_value' => 'required|in:0,1',
        ]);

        $existingLike = Like::where('user_id', $request->user_id)
            ->where('post_id', $request->post_id)
            ->first();

        if ($existingLike) {
            $existingLike->like_value = $request->input('like_value');
            $existingLike->save();
        } else {
            $like = new Like();
            $like->like_value = $request->input('like_value');
            $like->user_id = $request->user_id;
            $like->post_id = $request->post_id;
            $like->save();
        }

        return response()->json();
    }
}
