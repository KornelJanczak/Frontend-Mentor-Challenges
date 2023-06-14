`use strict`;
const msgContainer = document.querySelector(".container");
const commentInput = document.querySelector(".add-comment");
const sendBtn = document.querySelector(".send-msg");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const modalCancBtn = document.querySelector(".btn-cancel");
const modalDelBtn = document.querySelector(".btn-delete");
msgContainer.innerHTML = "";
// ID
let replyId;
let commentId;
let ID;
// Arrays
let repliesArr;
let dataArr;
// Rep or Comment
let rep;

// drop JSON
const getJSON = function (file, errorMsg = "Something went wrong") {
  return fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error(`${errorMsg},${response.status}`);
      return response.json();
    })
    .catch((err) => console.error(`${(errorMsg, err)}`));
};

// Event Handler
const fetchEventHandler = function () {
  getJSON("data.json").then((data) => {
    dataArr = Array.isArray(data) ? data : data.comments;
    // Send Comment
    sendBtn.addEventListener("click", function (e) {
      e.preventDefault();
      createComment(data, commentInput.value, msgContainer);
    });
    // Reply, delete, edit, plus/minus
    events(data);
    // Modal Delete Button
    modalDelBtn.addEventListener("click", function () {
      delComment(data);
    });
  });
};
fetchEventHandler();

// render Comment
const renderComment = function (data, container) {
  let html;

  const type =
    data.user.username === "juliusomo"
      ? `
    <button class="delete-btn">
      <img src="images/icon-delete.svg" />
      Delete
    </button>
    <button class="edit-btn">
      <img src="images/icon-edit.svg" />
      Edit
    </button>
    `
      : `<button class="reply-btn">
    <img src="images/icon-reply.svg" />
    Reply
  </button>`;

  const you =
    data.user.username === "juliusomo" ? `<span class="you">you</span>` : ``;

  if (container.classList.contains("container")) {
    // Head comment
    html = `
  <div class="msg-and-reply-content "id="${data.id}">
    <div class="message-container">
      <div class="plus-minus">
        <img src="images/icon-plus.svg" alt="plus" class="plus" />
        <span class="plus-minus--counter"> ${data.score}</span>
        <img src="images/icon-minus.svg" alt="minus" class="minus" />
      </div>
      <div class="msg">
        <div class="msg-owner">
          <img
            src=${data.user.image.png}
            alt="owner"
            class="img-owner"
          />
          <strong class="username">${data.user.username}</strong>
          ${you}
          <span class="created-at">${data.createdAt}</span>
          ${type}
        </div>
        <div class="msg-content">
          <p class="msg-text">
            ${data.content}
          </p>
        </div>
       </div>
      </div>
    <div class="reply-msg">
    
    </div>
  </div>
      `;
  } else {
    // Reply Comment
    html = `
    <div class="reply-box" id=${data.id}>
    <div class="line-box">
       <div class="vertical-line"></div>
    </div>
    <div class="message-container reply">
       <div class="plus-minus">
          <img src="images/icon-plus.svg" alt="plus" class="plus" />
          <span class="plus-minus--counter">${data.score}</span>
          <img src="images/icon-minus.svg" alt="minus" class="minus" />
       </div>
       <div class="msg">
          <div class="msg-owner">
             <img
                src=${data.user.image.png}
                alt="owner"
                class="img-owner"
                />
             <strong class="username">${data.user.username}</strong>
             ${you}
             <span class="created-at">${data.createdAt}</span>
             ${type}
          </div>
          <div class="msg-content">
             <p class="msg-text">
                ${data.content}
             </p>
          </div>
       </div>
    </div>
 </div>

   `;
  }
  container.insertAdjacentHTML("beforeend", html);
};

// Render replies box
const repliesBox = function (input, replyOwner, where) {
  let replyForMessage = `
  <div class="reply-box send-reply-msg">
    <div class="line-box">
      <div class="vertical-line"></div>
    </div>
    <div class="message-container reply reply-mobile">
      <img
      src="images/avatars/image-juliusomo.png"
      class="juliusomo"
      alt="juliusomo"
      />
      <input type="text" 
      class="add-comment" 
      placeholder="Add a comment..."  
      value="@${replyOwner} "
      />
     
    <button class="send-msg">
      SEND
    </button>
    </div>
  </div>
  `;

  input.insertAdjacentHTML(where, replyForMessage);
};

// Get Comment
const getCommentData = function (arr) {
  getJSON("data.json").then((data) => {
    // New id
    arr = Array.isArray(arr) ? dataArr : data.comments;
    // Render Head Comment
    arr.forEach((com, i) => {
      (com.id = i + 1), renderComment(com, msgContainer);
    });
    // Render Replies Comment
    const replyContainer = document.querySelectorAll(".reply-msg");
    // Rep two
    arr[1].replies.forEach((rep, i) => {
      rep.id = 0 + i + 1;
      renderComment(rep, replyContainer[1]);
    });
    // Rep one
    arr[0].replies.forEach((rep, i) => {
      (rep.id = i + 1), renderComment(rep, replyContainer[0]);
    });
  });
};
getCommentData();

// Create Comment

const createComment = function (data, content, container) {
  // Check if comments or replies arr
  const curUser = {
    image: { png: "./images/avatars/image-juliusomo.png" },
    username: "juliusomo",
  };
  dataArr = Array.isArray(data) ? data : data.comments;
  dataArr.forEach((com, i) => (com.id = i + 1));
  // ID
  const ids = dataArr.map((com) => {
    return com.id;
  });
  const ID = ids.length === 0 ? +1 : Math.max(...ids) + 1;
  // Push comment to array
  if (content === "") {
    alert("Input is empty!");
  } else {
    const newComment = {
      content: content,
      createdAt: "now",
      id: ID,
      score: 0,
      user: curUser,
    };
    dataArr.push(newComment);
    commentInput.value = "";
    renderComment(newComment, container);
    console.log(dataArr);
  }
};

// Click Events
const events = function (data) {
  msgContainer.addEventListener("click", function (e) {
    e.preventDefault();
    commentId = +e.target.closest(".msg-and-reply-content ").id;
    // Reply item
    const replyBtn = e.target.classList.contains("reply-btn");
    const replyInput =
      e.target.closest(".message-container").nextElementSibling;
    const replyContainer = document.querySelectorAll(".reply-msg");
    const replyBox = e.target.closest(".reply-box");

    // Send item
    const sendBtn = e.target.classList.contains("send-msg");
    const sendInput = e.target.previousElementSibling;
    const sendBox = e.target.closest(".send-reply-msg");

    // Delete item
    const delBtn = e.target.classList.contains("delete-btn");

    // Edit item
    const editBtn = e.target.classList.contains("edit-btn");
    const msgContent = e.target.parentNode.nextElementSibling;

    // Plus/Minus
    const plus = e.target.classList.contains("plus");
    const minus = e.target.classList.contains("minus");

    // Guard
    if (!replyBtn && !sendBtn && !delBtn && !editBtn && !plus && !minus) return;
    // Reply input
    if (replyBtn && replyInput) {
      const replyOwner =
        e.target.previousElementSibling.previousElementSibling.textContent;
      repliesBox(replyInput, replyOwner, "afterbegin");
    } else if (replyBtn && replyInput === null) {
      const replyOwner =
        e.target.previousElementSibling.previousElementSibling.textContent;
      repliesBox(replyBox, replyOwner, "afterend");
    }

    // Reply Content
    // Send Reply
    if (sendBtn) {
      repliesArr = data.comments[commentId - 1].replies;
      createComment(repliesArr, sendInput.value, replyContainer[commentId - 1]);
      sendInput.value = "";
      sendBox.classList.add("hidde");
    }

    // Delete Button
    if (delBtn) {
      saveId(data, e);
      openModal();
    }

    // Edit Button
    if (editBtn && e.target.textContent !== "Save") {
      saveId(data, e);
      // Create form
      const editForm = document.createElement("div");
      const editInput = document.createElement("input");
      editForm.classList.add("edit-form");
      editInput.type = "text";
      editInput.classList.add("add-comment");
      editForm.appendChild(editInput);
      editInput.value = msgContent.textContent.trim();
      msgContent.removeChild(msgContent.firstElementChild);
      msgContent.appendChild(editForm);
      const buttonText = e.target;
      buttonText.innerHTML = `<img src="images/icon-edit.svg"/>Save`;
      // Save Edit
    } else if (editBtn && e.target.textContent === "Save") {
      e.target.innerHTML = `<img src="images/icon-edit.svg"/> Edit`;
      const saveCom = msgContent.firstElementChild.firstElementChild.value;
      if (rep === true) {
        repliesArr.forEach((rep, i) => (rep.id = i + 1));
        data.comments[commentId - 1].replies[ID].content = saveCom;
        // Render Data
        replyContainer[commentId - 1].innerHTML = "";
        repliesArr.forEach((data) => {
          renderComment(data, replyContainer[commentId - 1]);
        });
      }
      if (rep === false) {
        dataArr.forEach((data, i) => (data.id = i + 1));
        dataArr[commentId - 1].content = saveCom;
        // Render Data
        msgContainer.innerHTML = "";
        getCommentData(dataArr);
      }
    }

    // Plus Button
    if (plus) {
      likeDissLike(
        data,
        e,
        true,
        +e.target.nextElementSibling.textContent,
        e.target.nextElementSibling
      );
    }

    // Minus button
    if (minus) {
      likeDissLike(
        data,
        e,
        false,
        +e.target.previousElementSibling.textContent,
        e.target.previousElementSibling
      );
    }
  });
};

// Delete Comment
const delComment = function (data) {
  const replyContainer = document.querySelectorAll(".reply-msg");
  if (rep === true) {
    // New id Arr
    repliesArr.splice(ID, 1);
    repliesArr.forEach((rep, i) => (rep.id = i + 1));
    // Render replies
    replyContainer[commentId - 1].innerHTML = "";
    repliesArr.forEach((data) => {
      renderComment(data, replyContainer[commentId - 1]);
    });
  }
  if (rep === false) {
    // Edit Arr
    dataArr.splice(ID, 1);
    dataArr.forEach((data, i) => (data.id = i + 1));
    // Render Head Comment
    msgContainer.innerHTML = "";
    getCommentData(dataArr);
  }
  closeModal();
};

// Save ID
const saveId = function (data, e) {
  if (!e.target.closest(".reply-box")) {
    // Comment ID
    ID = +e.target.closest(".msg-and-reply-content ").id - 1;
    rep = false;
  } else {
    // Reply ID
    ID = +e.target.closest(".reply-box").id - 1;
    repliesArr = data.comments[commentId - 1].replies;
    rep = true;
  }
};

// Like/Disslike
const likeDissLike = function (data, e, operator, counter, counterEL) {
  saveId(data, e);
  operator === true ? (counter += 1) : (counter -= 1);
  if (rep === true) {
    repliesArr.forEach((rep, i) => {
      rep.id = i + 1;
      if (rep.id === ID + 1) {
        rep.score = counter;
      }
    });
  } else {
    if (rep === false) {
      dataArr.forEach((com, i) => {
        com.id = i + 1;
        if (com.id === ID + 1) {
          com.score = counter;
        }
      });
    }
  }
  counterEL.textContent = counter;
};

// Open Modal
const openModal = function () {
  modal.classList.remove("hidde");
  overlay.classList.remove("hidde");
  document.body.style.overflowY = "hidden";
};

// Close Modal
const closeModal = function () {
  modal.classList.add("hidde");
  overlay.classList.add("hidde");
  document.body.style.overflowY = "auto";
};

// Event Handlers
modalCancBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
