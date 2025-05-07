<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Handle a login request.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();
            return response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ], 200);
        }

        return response()->json(['message' => 'Invalid credentials or account does not exist'], 401);
    }

    /**
     * Handle a registration request.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            // Log the validated data for debugging
            \Log::info('Registration Attempt:', $validated);

            // Attempt to create the user
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);

            // Automatically log the user in upon successful registration
            Auth::login($user);

            return response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ], 201);
        } catch (\Exception $e) {
            // Log the error details for debugging
            \Log::error('Registration Error:', ['message' => $e->getMessage()]);

            return response()->json([
                'message' => 'Registration failed. Please try again.',
                'error' => $e->getMessage(), // Optional: remove in production for security
            ], 500);
        }
    }

    /**
     * Log the user out.
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
