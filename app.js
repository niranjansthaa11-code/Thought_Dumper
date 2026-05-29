emailjs.init("nbR9OQOAma6XSP6sJ");

const sendBtn = document.querySelector(".send-btn");
const emailInput = document.querySelector(".your-email input");
const thoughtInput = document.getElementById("user-thought");

sendBtn.addEventListener("click", function(){
    const email = emailInput.value.trim();
    const thought = thoughtInput.value.trim();
    // this reduces the space of the typed thing 

    //for warning the user
    if(!email){
        alert("Please enter your email first.");
        return;
    }
    if(!thought){
        alert("Please write down your thought first");
        return;
    }
    sendBtn.textContent="Sending....";
    sendBtn.ariaDisabled=true;

    emailjs.send("service_mruebvt","template_gym7x8s",{
        to_email: email,
        message: thought,
    })
    //to tell the user that the thought has been sent out ..
    .then(() => {
        alert("Your Thought has been sent to your email !! ")
        emailInput.value="";
        thoughtInput.value="";
    })
    .catch((error)=>{
        alert("Something went wrong !!");
        console.error(error);
    })
    .finally(() =>{
        sendBtn.textContent="send"
        sendBtn.disabled=false;
        
    });
});