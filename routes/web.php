<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ShoppingListController;
use App\Http\Controllers\ShoppingItemController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Welcome page
Route::get('/', function () {
    return view('welcome');
})->name('welcome');

// Auth routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

// Protected routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Shopping Lists
    Route::get('/new-list', [ShoppingListController::class, 'create'])->name('lists.create');
    Route::post('/lists', [ShoppingListController::class, 'store'])->name('lists.store');
    Route::get('/list/{list}', [ShoppingListController::class, 'show'])->name('lists.show');
    Route::delete('/list/{list}', [ShoppingListController::class, 'destroy'])->name('lists.destroy');
    
    // List Items
    Route::post('/list/{list}/items', [ShoppingItemController::class, 'store'])->name('items.store');
    Route::patch('/items/{item}', [ShoppingItemController::class, 'update'])->name('items.update');
    Route::delete('/items/{item}', [ShoppingItemController::class, 'destroy'])->name('items.destroy');
    
    // Categories
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
});
