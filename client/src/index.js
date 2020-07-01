import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const gitHubForm = document.getElementById('gitHubForm');

gitHubForm/addEventListener('submit', (e) => {

  e.preventDefault();

  let usernameInput = document.getElementById('usernameInput');

  let gitHubUsername = usernameInput.value ;

  requestUserRepos(gitHubUsername);
})

function requestUserRepos(username) {
  const xhr = new XMLHttpRequest();

  const url = `https://api.github.com/users/${username}/repos`;

  xhr.open('GET', url, true)

  xhr.onload = function() {
    const data = JSON.parse(this.response);

    console.log(data);

    for (let i in data) {
      let ul = document.getElementById('userRepos');

      let li = document.getElementById('li');

      li.classList.add('list-group-item')

      li.innerHTML = (`
        <p>Repo: ${data[i].name}</p>
        <p>Description: ${data[i].description}</p>
        <p>URL: <a href='${data[i].html_url}'>${data[i].html_url}</a></p>
      `);

      ul.appendChild(li);
    }
  }

  xhr.send()
}
