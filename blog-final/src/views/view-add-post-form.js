(function (app) {
  class ViewAddPostForm {
    constructor () {
      let addPostForm = document.forms['add-post-form'];
      let btnAddPost = addPostForm.querySelector('button');

      btnAddPost.addEventListener('click', (event) => {
        let title = addPostForm.title.value;
        let description = addPostForm.description.value;

        let post = {title, description};
        this.sendPost(post);
      })

    }

    sendPost (post) {
      document.dispatchEvent(new CustomEvent(
        'add-post',
        {detail: post}
      ))

    }

  }

  app.views.ViewAddPostForm = ViewAddPostForm;
})(App);