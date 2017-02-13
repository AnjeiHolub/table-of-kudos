(function (app) {

  let ViewBase = app.views.ViewBase;

  class ViewPostDetail extends ViewBase {
    constructor () {
      super();
      this.tpl = document.querySelector('#view-post-detail-tpl');
      this.container = document.querySelector('.view-posts-container');
    }

    preRender (post) {
      this.render(post, this.tpl.innerHTML, this.container);
      this.btnAddComment = this.container.querySelector('.btn-add-comment');
      this.btnAddComment.addEventListener('click', () => {
        let comment = document.forms['add-comment-form'].msg.value;
        this.sendAddCommentEvent(post, comment);
      });
      this.btnBack = this.container.querySelector('.btn-back');
      this.btnBack.addEventListener('click', () => {
        this.backAllPosts();
      })
    }

    sendAddCommentEvent (post, comment) {
      document.dispatchEvent(new CustomEvent(
        'add-comment',
        {detail: {
          post: post,
          comment: comment
        }}
      ));
    }

    backAllPosts () {
      document.dispatchEvent(new CustomEvent(
        'back-post'
      ));
    }
  }

  app.views.ViewPostDetail = ViewPostDetail;
})(App);