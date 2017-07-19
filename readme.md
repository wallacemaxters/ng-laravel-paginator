## NG Laravel Paginator

This package provides a easy way to use Pagination of the Laravel with AngularJS interface


See example [here](https://rawgit.com/wallacemaxters/ng-laravel-paginator/master/index.html)

## Install via bower

```bash
bower install https://github.com/wallacemaxters/ng-laravel-paginator.git
```


In Laravel method, you can use paginator like this:

```php
Route::get('/users/list', function () {        
    return User::paginate();
});
```

In angular:

```js
var app = angular.module('test', ['ng-laravel-paginator']);

app.controller('TestController', function ($scope, LaravelPaginator) {
    $scope.users = new LaravelPaginator('/users/list');
    // Or with query string
    // in case you do like this in your Laravel app:
    // Route::get('/users/list/{search}', function ($search) {       
    //     return User::paginate();
    // });
    $scope.users = new LaravelPaginator('/users/list', {
        search: 'wallace'
    });
});
```

Html:

```html
<div ng-controller="TestController">
    <div ng-repeat="user in users.data">
        {{ user.name}}
    </div>

    <a ng-click="users.next()">
        Call the next page result
    </a>

    <div ng-show="users.isEmpty()">Result not found</div>
    
    <!-- detect if request is busy -->
    <div ng-show="users.busy">Loading</div>
</div>
```


