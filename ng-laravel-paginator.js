angular.module('ng-laravel-paginator', [])

.factory('LaravelPaginator', ['$http', function ($http) {

    var Paginator = function (url, params, method) {

        this.busy = false;

        this.currentPage = 1;

        this.data = [];

        this.from = null;

        this.lastPage = 0;

        this.method = method || 'GET';

        this.nextUrl = null;

        this.params = params || {};

        this.previousUrl = null;

        this.startUrl = url;

        this.to = null;

        this.total = 0;

        this.currentResponse = null;

        this.next();

    };

    Paginator.prototype.isEmpty = function () {

        return this.data.length === 0;
    };

    Paginator.prototype.remove = function (item) {

        var index = this.data.indexOf(item);

        if (index === -1) return null;

        return this.data.splice(index, 1)[0];
    };

    Paginator.prototype.moveToFirst = function (item) {

        var value = this.remove(item);

        if (value !== null)
            this.data.unshift(value);
    };

    Paginator.prototype.moveToLast = function (item) {

        var value = this.remove(item);

        if (value !== null)
            this.data.push(value);
    };

    Paginator.prototype.getData = function (action) {
        var that = this, data;

        var actionUrl = (action === 'next') ? this.nextUrl || this.startUrl : this.previousUrl

        if (that.busy) return;

        that.busy = true;

        return $http({

                url: actionUrl,

                params: this.params,

                method: this.method,

            }).then(function (response) {

                that.currentResponse = response;

                data = response.data.data;

                that.busy        = false;
                that.currentPage = data.current_page;
                that.data        = data.data;
                that.from        = data.from;
                that.lastPage    = data.last_page;
                that.nextUrl     = data.next_page_url;
                that.previousUrl = data.prev_page_url;
                that.to          = data.to;
                that.total       = data.total;

            });
    };

    Paginator.prototype.next = function () {

        this.getData('next');
    };

    Paginator.prototype.previous = function () {

        this.getData('previous');
    };

    return Paginator;

}]);
