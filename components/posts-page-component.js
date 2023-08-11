import { USER_POSTS_PAGE, POSTS_PAGE,  LOADING_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { likeUser, dislikeUser } from "../api.js";
import {formatDistanceToNow } from "date-fns";
import {ru } from "date-fns/locale";

let createDate
export function renderPostsPageComponent({ appEl, token }) {
  console.log('post go')
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
 
  const postHtml = posts.map((post) => {
    createDate = formatDistanceToNow(new Date(post.createdAt), {locale: ru}, {includeSeconds: true});
    return `
    <div class="page-container">
    <div class="header-container"></div>
      <ul class="posts">
        <li class="post">
          <div class="post-header" data-user-id="${post.user.id}">
              <img src="${
                post.user.imageUrl
              }" class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${post.id}" data-is-Liked="${post.isLiked}" 
            class="like-button">
            
            ${
              !post.isLiked
                ? `<img src="./assets/images/like-not-active.svg">`
                : `<img src="./assets/images/like-active.svg">`
            }
              
            </button>
            <p class="post-likes-text">
              Нравится: ${post.likes.length < 2 ? `<strong>${0 === post.likes.length ? "0" : post.likes.map((({name: post})=>post)).join(",")}</strong>` : `<strong>${post.likes[Math.floor(Math.random() * post.likes.length)].name}</strong> и <strong>еще ${(post.likes.length - 1).toString()}</strong>`}
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>
            ${post.description}
          </p>
          <p class="post-date">
            ${createDate}
          </p>
        </li>
      </ul>
    </div>`;
  })
  .join("");

appEl.innerHTML =  postHtml;


  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      console.log('post!')
      goToPage(LOADING_PAGE);
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
      console.log(userEl.dataset.userId);
    });
  }

  for (const likesButtons of document.querySelectorAll(".like-button")) {
    likesButtons.addEventListener("click", () => {
      console.log("like!!!")
      let id = likesButtons.dataset.postId;
      console.log(id);

      if (likesButtons.dataset.isLiked === "false") {
        likeUser({ token, id })
        .then(() => {
          console.log(token);
          console.log(id);
          goToPage(POSTS_PAGE);
        });
      }
      
      if (likesButtons.dataset.isLiked === "true") {
        dislikeUser({ token, id }).then(() => {
          goToPage(POSTS_PAGE);
        });
      }
    });
  }
}


