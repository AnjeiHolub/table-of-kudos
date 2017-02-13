(function (app) {

  class Comment {
    constructor(comment) {
        this.msg = comment.msg;
    }
  }

  class Post {
    constructor (post) {
      this.id = post.id;
      this.title = post.title;
      this.description = post.description;
      this.comments = post.comments || [];
    }

    addComment (comment) {
      this.comments.push(comment);
    }
  }

  app.models.Post = Post;
  app.models.Comment = Comment;
})(App);