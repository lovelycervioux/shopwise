<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with the user's shopping lists.
     */
    public function index()
    {
        $lists = Auth::user()->shoppingLists()->orderBy('created_at', 'desc')->get();
        
        return view('dashboard', compact('lists'));
    }
}
