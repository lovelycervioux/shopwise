@extends('layouts.app')

@section('content')
<div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100" style="font-family: 'Inter', sans-serif">
    <div class="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/50 via-slate-100/30 to-blue-100/40"></div>
    
    <div class="container mx-auto px-4 py-12">
        <div class="max-w-md mx-auto">
            <div class="text-center mb-8">
                <div class="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                        <circle cx="8" cy="21" r="1"/>
                        <circle cx="19" cy="21" r="1"/>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                    </svg>
                </div>
                <h1 class="mt-4 text-3xl font-bold text-gray-800" style="font-family: 'Montserrat', sans-serif">
                    Sign in to ShopWise
                </h1>
                <p class="mt-2 text-gray-600">
                    Track your grocery budget and never overspend again
                </p>
            </div>
            
            <div class="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md border border-white/50">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h2>
                
                @if ($errors->any())
                    <div class="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                
                <form method="POST" action="{{ route('login') }}">
                    @csrf
                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value="{{ old('email') }}"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            placeholder="you@example.com"
                            required
                        >
                    </div>
                    
                    <div class="mb-6">
                        <label for="password" class="block text-gray-700 font-medium mb-1">
                            Password
                        </label>
                        <div class="relative">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="••••••••"
                                required
                            >
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        class="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:translate-y-[-1px] active:translate-y-[0px] transition font-medium"
                    >
                        Sign In
                    </button>
                </form>
            </div>
            
            <div class="mt-6 text-center text-gray-600">
                Don't have an account?
                <a href="{{ route('register') }}" class="text-blue-600 hover:underline font-medium">
                    Sign up
                </a>
            </div>
        </div>
    </div>
</div>
@endsection
