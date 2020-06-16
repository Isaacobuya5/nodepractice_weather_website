console.log("Here is my lovely message");

const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");


document.querySelector("form").addEventListener('submit', (event) => {
    // prevent browser from reloading when form is submitted
    event.preventDefault();
    // get the address the user typed in
    // get refernce to the input field
    const searchText = document.querySelector("input").value;

    // const url = `http://localhost:3000/weather?address=${searchText}`;

    const url = `/weather?address=${searchText}`;

    messageOne.textContent = "Loading..."
    fetch(url).then((response) => {
      response.json().then((response) => {
         if (response.error) {
        messageOne.textContent(response.error);
        console.log(response.error);
       } else {
        const {location, forecast} = response;
        messageOne.textContent = location;
        messageTwo.textContent = forecast;
    }
}).catch((error) => {
    messageOne.textContent = error.message
    messageTwo.textContent = ''
})
});
});
