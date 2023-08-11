import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";
import { postSending } from "../api.js";

export function renderAddPostPageComponent({ appEl, token, onAddPostClick }) {
  let imageUrl = "";

  const renderAddingAPost = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
      <h3 class="form-title">Добавить пост</h3>
      <div class="form-inputs">
        <div class="upload-image-container">
          <div class="upload=image">
          <div class="upload-image-container"></div>
          </div>
        </div>
        <label for="">
          Опишите фотографию:
          <textarea class="input textarea" rows="4"></textarea>
        </label>
        <button class="button" id="add-button">Добавить</button>
      </div>
    </div>
    </div>
  `;

    appEl.innerHTML = appHtml;
    
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    

    const fileUploadLabel = document.querySelector(".upload-image-container");

    if (fileUploadLabel) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
          console.log(newImageUrl);
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      
      const sendingAMessage = document.querySelector(".textarea");

      if (!imageUrl) {
        alert("Добавьте фотографию");
        return;
      }

      if (sendingAMessage.value === "") {
        alert("Опишите фотографию");
        return;
      }

      postSending({
        description: sendingAMessage.value
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;')
        .replace('&', '&amp;')
        .replace('`', '&lsquo;'),
        imageUrl,
        token,
      })
      
      onAddPostClick({
        description: sendingAMessage.value
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;')
        .replace('&', '&amp;')
        .replace('`', '&lsquo;'),
        imageUrl,
      });
    });
  };
  renderAddingAPost();
}
