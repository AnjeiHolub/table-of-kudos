(function (app) {

    class ViewBase {

        render(data, tpl, container) {
            let item = Handlebars.compile(tpl)(data);
            container.innerHTML = item;
        }

    }

    app.views.ViewBase = ViewBase;

})(App);