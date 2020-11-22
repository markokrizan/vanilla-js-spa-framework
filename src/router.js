class Router {
    constructor(app) {
        this.app = app;
        this.routes = [];
        this.hashChange = this.hashChange.bind(this); //invoked by Window as event listener callback - bind the Router class on invocation

        window.addEventListener('hashchange', this.hashChange);
        window.addEventListener('DOMContentLoaded', this.hashChange);
    }

    addRoute(name, url) {
        this.routes.push({
            name,
            url
        });
    }

    hashChange() {
        const hash = window.location.hash;

        const route = this.routes.find(route => hash.match(new RegExp(route.url)));

        if (!route) {
            this.app.showComponent('not-found');
        }

        this.params = new RegExp(route.url).exec(hash);
        this.app.showComponent(route.name);
    }
}