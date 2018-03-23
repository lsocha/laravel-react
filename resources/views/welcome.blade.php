@desktop 
    <!-- <h1>Desktop view</h1> -->
@elsedesktop
    <!-- <h1>Mobile view</h1> -->
@enddesktop

@extends('layouts.app')

@section('content')
    <h2 style="text-align: center"> Laravel and React application </h2>
    <div id="root"></div>
@endsection