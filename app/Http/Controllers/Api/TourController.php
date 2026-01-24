<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tour;

class TourController extends Controller
{
    public function index()
    {
        $tours = Tour::all();
        return response()->json($tours);
    }

    public function show($id)
    {
        $tour = Tour::findOrFail($id);
        return response()->json($tour);
    }
}