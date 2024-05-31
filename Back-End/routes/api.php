<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);
Route::post('logout',[AuthController::class,'logout'])->middleware('auth:sanctum');

Route::get('users',[UserController::class,'index']);
Route::post('new-post',[UserController::class,'store']);


Route::get('posts',[PostController::class,'index']);
Route::post('like',[PostController::class,'like']);
Route::get('likes',[PostController::class,'allLikes']);


