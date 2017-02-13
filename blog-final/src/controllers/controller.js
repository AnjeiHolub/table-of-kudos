(function (app) {

  let ViewAddPostForm = app.views.ViewAddPostForm;
  let viewPostsList = new app.views.ViewPostsList();
  let viewPostDetail = new app.views.ViewPostDetail();
  let Post = app.models.Post;
  let Comment = app.models.Comment;
  let postsService = new app.services.PostsService();
  let Helpers = app.Helpers;

  class PostsController {
    constructor () {
      new ViewAddPostForm();

      this.fetchPosts();

    
      document.addEventListener('add-post', (data) => {
        let id = Helpers.getRandomId();
        let post = new Post (Object.assign(data.detail, {id}));
        postsService.addPost(post, this.fetchPosts);
      });

      document.addEventListener('remove-post', (event) => {
        postsService.removePost(event.detail, this.fetchPosts);
      });

      window.addEventListener('hashchange', (event) => {
        let id = Helpers.getHash(event.newURL);
        if (id) {
          this.getPostById(id);
        }
      })

      document.addEventListener('add-comment', (event) => {
        let post = event.detail.post;
        post.addComment(new Comment({msg: event.detail.comment}));
        postsService.save(viewPostDetail.preRender(post));
      });

      document.addEventListener('back-post', () => {
        this.fetchPosts();
      })
    }

    getPostById (id) {
      let post = new Post(postsService.getById(id));
      viewPostDetail.preRender(post);
    }

    fetchPosts () {
      postsService.fetch(viewPostsList.preRender.bind(viewPostsList));
    }

  }

  app.controllers.PostsController = PostsController;
})(App);