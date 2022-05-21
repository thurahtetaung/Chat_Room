//DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');


// add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

// update username

newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = newNameForm.name.value.trim();
    chatroom.updateName(name);
    newNameForm.reset();
    updateMessage.innerText = `Username is now ${name}`;
    setTimeout(() => updateMessage.innerText = '', 3000);

});

rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(data => chatUI.render(data));
        // setting the url so the users knows where they are
        history.replaceState({}, '', `#${e.target.getAttribute('id')}`);
    }
})

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', localStorage.name);


// get chats and render
chatroom.getChats(data => chatUI.render(data));