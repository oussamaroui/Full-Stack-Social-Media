<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'image',
        'caption',
        'user_id'
    ];

    public $appends = ['current_user_like_value'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function getCurrentUserLikeValueAttribute()
    {
        $like = $this->likes()->where('user_id', Auth::id())->first();
        return $like ? $like->like_value : 0;
    }
}
