<nav class="sticky top-0 z-50 transition-all duration-300 bg-white/80 shadow-md backdrop-blur-md border-b border-white/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex items-center">
                <a href="{{ route('welcome') }}" class="flex items-center gap-2">
                    <div class="p-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                            <circle cx="8" cy="21" r="1"/>
                            <circle cx="19" cy="21" r="1"/>
                            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                        </svg>
                    </div>
                    <span class="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600" style="font-family: 'Outfit', sans-serif">
                        ShopWise
                    </span>
                </a>
            </div>

            <!-- Desktop navigation -->
            <div class="hidden md:flex items-center space-x-4">
                @guest
                    <a href="{{ route('login') }}" class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                        Login
                    </a>
                    <a href="{{ route('register') }}" class="px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-md hover:translate-y-[-1px] active:translate-y-[0px] transition duration-200">
                        Sign Up
                    </a>
                @else
                    <a href="{{ route('dashboard') }}" class="nav-link {{ request()->routeIs('dashboard') ? 'nav-link-active' : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/80' }}">
                        Dashboard
                    </a>
                    <a href="{{ route('lists.create') }}" class="nav-link {{ request()->routeIs('lists.create') ? 'nav-link-active' : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/80' }}">
                        New List
                    </a>
                    <div class="flex items-center ml-4 pl-4 border-l border-gray-200">
                        <div class="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            <span class="text-sm font-medium">
                                {{ Auth::user()->name }}
                            </span>
                        </div>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="p-2 rounded-full text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200" title="Logout">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                    <polyline points="16 17 21 12 16 7"/>
                                    <line x1="21" y1="12" x2="9" y2="12"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                @endguest
            </div>

            <!-- Mobile menu button -->
            <div class="flex items-center md:hidden">
                <button id="mobile-menu-button" class="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-icon">
                        <line x1="3" y1="12" x2="21" y2="12"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <line x1="3" y1="18" x2="21" y2="18"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="x-icon hidden">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</nav>
