import { renderHeaderComponent } from './header-component.js';

const imageUrl = '';
export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
        <div class="header-container"></div>
        <div class="form">
            <h3 class="form-title">
              Добавить пост
              </h3>
              
          <div class="form-inputs">
            <div class="upload=image">
              ${
                imageUrl
                  ? `
                  <div class="file-upload-image-conrainer">
                    <img class="file-upload-image" src="${imageUrl}">
                    <button class="file-upload-remove-button button">Заменить фото</button>
                  </div>
                  `
                  : `
                    <label class="file-upload-label secondary-button">
                        <input
                          type="file"
                          class="file-upload-input"
                          style="display:none"
                        />
                        Выберите фото
                    </label>
              `
              }
            </div>
                <label>
                " Опишите фотографию: "
                    <textarea
                      type="file"
                      class="input textarea" 
                      rows="4"
                      style="display:none"
                    />
                    </textarea>
                </label>
                <button class="button" id="login-button">Добавить</button>
          </div>
        </div>
    </div>    
  </div>
`;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector('.header-container'),
    });

    document.getElementById('add-button').addEventListener('click', () => {
      onAddPostClick({
        description: 'Описание картинки',
        imageUrl: 'https://image.png',
      });
    });
  };

  render();
}
