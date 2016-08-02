angular.module('wallacemaxters.ng-laravel-paginator', [])

.factory('LaravelPaginator', ['$http', function ($http) {

    function Paginator (url, params) {

        this.busy = false;

        this.completed = false;

        this.currentPage = 1;

        this.data = [];

        this.from = null;

        this.lastPage = 0;

        this.nextUrl = null;

        this.params = params;

        this.previousUrl = null;

        this.startUrl = url;

        this.to = null;

        this.total = 0;

        this.next();

    }

    Paginator.prototype.isEmpty = function () {

        return this.data.length === 0;
    };

    Paginator.prototype.remove = function (item) {

        var index = this.data.indexOf(item);

        if (index === -1) return;

        return this.data.splice(index, 1);
    };

    Paginator.prototype.next = function () {

        var that = this, data;

        if (this.busy || this.completed) return;

        this.busy = true;

        $http({

            url: this.nextUrl || this.startUrl,

            params: this.params,

        }).then(function (response) {

            data = response.data;

            that.busy        = false;
            that.currentPage = data.current_page;
            that.data        = that.data.concat(data.data);
            that.from        = data.from;
            that.lastPage    = data.last_page;
            that.nextUrl     = data.next_page_url;
            //that.perPage     = data.per_page;
            that.previousUrl = data.prev_page_url;
            that.to          = data.to;
            that.total       = data.total;

            if (! data.next_page_url) that.completed = true;

        });

        return that;
    };

    return Paginator;

}]);