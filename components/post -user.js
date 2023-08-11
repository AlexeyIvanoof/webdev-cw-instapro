// Страница сообщений пользователей

import { posts, goToPage } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";
import { USER_POSTS_PAGE} from "../routes.js";
import {formatDistanceToNow} from "date-fns";
import {ru } from "date-fns/locale";
import {likeUser,  dislikeUser } from "../api.js";



let createDate
export function renderPostsSpecificUser({ appEl, token }) {
  const postHtml = posts
    .map((post) => {
      createDate = formatDistanceToNow(new Date(post.createdAt),  {locale: ru}, {includeSeconds: true});
      return `
        <li class="post">
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
             Нравится: <strong>${post.likes.length}</strong>
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
        `;
    })
    .join("");

  const appHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <div class="posts-user-header posts-user-header__specific ">
          <div class="post-header" data-user-id="${posts[0].user.id}">
            <img src="${posts[0].user.imageUrl}" class="post-header__user-image post-header__user-image-header-specific">
            <p class="post-header__user-name post-header__user-name-specific"><b>${posts[0].user.name}</b></p>
          </div>
        </div>
        <ul class="posts">
           ${postHtml}
        </ul>
      </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });


  for (const likesButtons of document.querySelectorAll(".like-button")) {
    likesButtons.addEventListener("click", () => {
      let id = likesButtons.dataset.postId;
      console.log(id);

      if (likesButtons.dataset.isLiked === "false") {
        likeUser({ token, id })
        .then((response) => {
          console.log(token);
          console.log(id);
          goToPage(USER_POSTS_PAGE, {
            userId:  response.post.user.id
          });
        });
      }
      
      if (likesButtons.dataset.isLiked === "true") {
        dislikeUser({ token, id }).then((response) => {
          goToPage(USER_POSTS_PAGE, {
            userId: response.post.user.id
          });
        });
      }
    });
  }
}
