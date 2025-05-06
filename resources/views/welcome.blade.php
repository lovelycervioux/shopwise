@extends('layouts.app')

@section('content')
<div class="min-h-screen" style="font-family: 'Inter', sans-serif">
    <!-- Background elements -->
    <div class="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-100 to-indigo-100 opacity-90"></div>
    <div class="fixed inset-0 -z-10 bg-gradient-to-b from-indigo-50/50 to-blue-50/50"></div>
    
    <!-- Hero Section -->
    <main class="container mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between">
        <div class="md:w-1/2 mb-10 md:mb-0">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/80 rounded-full mb-6 shadow-sm backdrop-blur-sm">
                <div class="p-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                        <path d="M5 3v4"/>
                        <path d="M19 17v4"/>
                        <path d="M3 5h4"/>
                        <path d="M17 19h4"/>
                    </svg>
                </div>
                <span class="text-sm font-medium text-indigo-800">Smart Budget Tracking</span>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold mb-6" style="font-family: 'Outfit', sans-serif">
                Smart Grocery Shopping <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Starts Here</span>
            </h1>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                Take control of your grocery budget with ShopWise. Create categorized lists, track spending in real-time, and never go over budget again.
            </p>
            <a href="{{ route('register') }}" class="group py-3 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/20 hover:translate-y-[-2px] active:translate-y-[0px] transition duration-300 text-lg inline-flex items-center gap-2">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                </svg>
            </a>
        </div>
        <div class="md:w-1/2 rounded-xl relative overflow-hidden p-8 md:ml-10 shadow-xl" style="background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1); border: 1px solid rgba(255, 255, 255, 0.18);">
            <div class="rounded-xl relative overflow-hidden p-6 mb-6 border border-white/50" style="background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1); border: 1px solid rgba(255, 255, 255, 0.18);">
                <h3 class="font-semibold mb-4 text-gray-800" style="font-family: 'Outfit', sans-serif">Weekly Groceries</h3>
                <div class="flex justify-between mb-3">
                    <span class="text-gray-600">Budget</span>
                    <span class="font-medium">₱120.00</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-500 w-3/4" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);"></div>
                </div>
                <div class="flex justify-between mt-2">
                    <span class="text-sm text-gray-500">Spent: ₱90.45</span>
                    <span class="text-sm text-green-600 font-medium">Remaining: ₱29.55</span>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="rounded-xl relative overflow-hidden p-4 hover:shadow-md hover:translate-y-[-2px] transition-all duration-300" style="background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1); border: 1px solid rgba(255, 255, 255, 0.18);">
                    <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-600">
                            <path d="M20 6 9 17l-5-5"/>
                        </svg>
                    </div>
                    <h4 class="font-medium" style="font-family: 'Outfit', sans-serif">Organize Lists</h4>
                    <p class="text-sm text-gray-600">Categorize items for efficient shopping</p>
                </div>
                <!-- More feature cards here -->
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 px-8">
        <div class="container mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="flex items-center gap-2 mb-4 md:mb-0">
                    <div class="p-1.5 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                            <circle cx="8" cy="21" r="1"/>
                            <circle cx="19" cy="21" r="1"/>
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                        </svg>
                    </div>
                    <span class="font-bold text-xl" style="font-family: 'Outfit', sans-serif">ShopWise</span>
                </div>
                <div class="text-gray-400 text-sm">
                    © {{ date('Y') }} ShopWise. All rights reserved.
                </div>
            </div>
        </div>
    </footer>
</div>
@endsection
