(function (app) {
  class PostsService {
    constructor () {
      this.posts = [];
    }

    fetch (callback) {
      this.posts = JSON.parse(localStorage.getItem('posts')) || [];
      callback({posts: this.posts});
    }

    addPost (post, callback) {
      this.posts.push(post);
      this.save();
      callback();
    }

    save () {
      localStorage.setItem('posts', JSON.stringify(this.posts));
    }

    getById (id) {
      return this.posts.find((post) => {
        return post.id === parseInt(id);
      })
    }

    removePost (id, callback) {
      let wantedPostId = this.posts.findIndex((post) => {
        return post.id === id;
      });
      this.posts.splice(wantedPostId, 1);
      localStorage.setItem('posts', JSON.stringify(this.posts));
      callback();
    }
  }

  app.services.PostsService = PostsService;
})(App);