<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="ShopWise">
    <meta property="og:description" content="ShopWise: Master grocery budgeting with live tracking. Create categorized lists and manage spending like never before!">
    <title>ShopWise - Smart Budget Shopping</title>
    
    <!-- Styles -->
    @vite('resources/css/app.css')
    
    <!-- Scripts -->
    @vite('resources/js/app.js')
</head>
<body class="bg-gradient-to-b from-indigo-50 to-blue-50 min-h-screen">
    <div id="app">
        @include('layouts.navigation')
        
        <main>
            @yield('content')
        </main>
    </div>
</body>
</html>
