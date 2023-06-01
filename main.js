// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Get references to the heart elements
const hearts = document.querySelectorAll('.like-glyph');

// Iterate over the heart elements
hearts.forEach((heart) => {
  // Add click event listener to each heart
  heart.addEventListener('click', () => {
    // Check if the heart is currently empty or full
    const isFull = heart.classList.contains('activated-heart');

    // Reset the error modal
    const errorModal = document.getElementById('modal');
    errorModal.classList.add('hidden');

    // Make the server request
    mimicServerCall()
      .then(() => {
        if (isFull) {
          // Change the heart back to empty
          heart.innerText = EMPTY_HEART;
          heart.classList.remove('activated-heart');
        } else {
          // Change the heart to full
          heart.innerText = FULL_HEART;
          heart.classList.add('activated-heart');
        }
      })
      .catch((error) => {
        // Display the error modal
        const modalMessage = document.getElementById('modal-message');
        modalMessage.innerText = error;
        errorModal.classList.remove('hidden');

        // Hide the error modal after 3 seconds
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  });
});

// the code selects all the heart elements with the class like-glyph using document.querySelectorAll('.like-glyph'). 
// It then adds a click event listener to each heart element using addEventListener. 
// Inside the event listener, the server request is made using mimicServerCall(). 
// If the server request is successful (then block), the heart is changed to empty or full based on its current state. 
// If the server request fails (catch block), the error modal is displayed, 
// and after 3 seconds, it is hidden again using setTimeout.

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
