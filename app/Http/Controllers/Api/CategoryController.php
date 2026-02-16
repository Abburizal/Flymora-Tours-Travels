<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Cache::remember('categories', 1800, function () {
            return Category::select('id', 'name', 'description', 'created_at', 'updated_at')
                ->withCount('tours')
                ->orderBy('name', 'asc')
                ->get();
        });
        
        return response()->json($categories);
    }
}
