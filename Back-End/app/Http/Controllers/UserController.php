<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Story;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        $serializedUsers = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'profile_pic' => $user->profile_pic,
                'posts' => Post::where('user_id', $user->id)->get()->map(function ($post) {
                    return [
                        'image' => $post->image,
                        'likes_count' => $post->likes()->where('like_value', 1)->count(),
                    ];
                })->toArray(),
            ];
        });

        return response()->json($serializedUsers);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required',
            'caption' => 'required|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $imagePath;
        }

        $post = Post::create($validatedData);

        return response()->json([
            'message' => 'Post created successfully',
            'post' => $post,
        ], 201);
    }

    public function handleStory(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required',
            'story' => 'image|mimes:jpeg,png,jpg,gif',
        ]);

        $storyPath = $request->file('story')->store('stories', 'public');
        $validatedData['story'] = $storyPath;

        $story = Story::create($validatedData);

        return response()->json([
            'message' => 'Story created successfully',
            'story' => $story,
        ], 201);
    }

    public function stories(){
        $stories = Story::with(['user'])->get();
        return response()->json($stories);
    }
    // public function destoryIn24h(){
    //     $stories = Story::all();
    //     foreach ( $stories as $story){
    //         if (Carbon::date_diff($story->created_at, now() > 1)) {
    //             Story::delete($story);
    //         }
    //     }
    // }
}
