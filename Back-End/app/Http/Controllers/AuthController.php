<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $registerUserData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'profile_pic' => 'nullable|image|mimes:jpeg,png,jpg',
        ]);

        if ($request->hasFile('profile_pic')) {
            $profilePic = $request->file('profile_pic')->store('images', 'public');
            $registerUserData['profile_pic'] = $profilePic;
        }

        $user = User::create($registerUserData);

        return response()->json([
            'message' => 'User Created',
            'user' => $user,
        ], 201);
    }


    public function login(Request $request)
    {
        $loginUserData = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|min:8'
        ]);
        $user = User::where('email', $loginUserData['email'])->first();
        if (!$user || !Hash::check($loginUserData['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid Credentials'
            ], 401);
        }
        $token = $user->createToken($user->name . '-AuthToken')->plainTextToken;
        return response()->json([
            'access_token' => $token,
        ]);
    }


    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            "message" => "Logged out",
        ]);
    }
}
