<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/settings/preferences', [UserController::class, 'updatePreferences'])->middleware('auth:sanctum');
Route::get('/user/preferences', function () {
    $user = Auth::user();
    return response()->json([
        'preferred_categories' => $user->preferred_categories ?? [],
        'preferred_sources' => $user->preferred_sources ?? [],
        'preferred_authors' => $user->preferred_authors ?? [],
    ]);
})->middleware('auth:sanctum');

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/filters', [ArticleController::class, 'getFilters']);
Route::get('/articles/{id}', [ArticleController::class, 'getArticle']);
Route::get('/fetch-articles', [ArticleController::class, 'fetchArticles']);
