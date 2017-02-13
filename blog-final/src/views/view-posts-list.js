(function (app) {

  let ViewBase = app.views.ViewBase;

  class ViewPostsList extends ViewBase {
    constructor () {
      super();
      this.tpl = document.querySelector('#view-post-list-tpl');
      this.container = document.querySelector('.view-posts-container');

      this.container.addEventListener('click', (event) => {
        /*let isRemoveBtn = event.target.tagName === 'BUTTON';*/
        let el = event.target;
        if(el.className.includes('btn-remove')) {
          /*let id = el.getAttribute('data-id');*/
          let id = parseInt(el.dataset.id);
          this.sendRemoveEvent(id);
        }
      })
    }

    sendRemoveEvent (id) {
      document.dispatchEvent(new CustomEvent(
        'remove-post',
        {detail: id}
      ))
    }

    preRender (data) {
      this.render(data, this.tpl.innerHTML, this.container);
    }

/*    render (data) {
      let result = Handlebars.compile(this.tpl.innerHTML)(data);
      this.container.innerHTML = result;
    }*/
  }

  app.views.ViewPostsList = ViewPostsList;
})(App);