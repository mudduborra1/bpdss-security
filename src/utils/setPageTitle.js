// export const setTitle = (newTitle) => {
//     return (document.title = newTitle ? `${import.meta.env.VITE_APP_NAME} - ${newTitle}` : import.meta.env.VITE_APP_NAME);
// }

// src/utils/setPageTitle.js
export function setPageTitle(title) {
  document.title = title ? `${title} - My App` : "My App";
}
