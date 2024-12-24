<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function updatePreferences(Request $request)
    {
        $request->validate([
            'preferred_categories' => 'array',
            'preferred_sources' => 'array',
            'preferred_authors' => 'array',
        ]);

        $user = Auth::user();
        $user->preferred_categories = $request->preferred_categories;
        $user->preferred_sources = $request->preferred_sources;
        $user->preferred_authors = $request->preferred_authors;
        $user->save();

        return response()->json(['message' => 'Preferences updated successfully']);
    }
}
