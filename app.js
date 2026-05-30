emailjs.init("nbR9OQOAma6XSP6sJ");

const sendBtn = document.querySelector(".send-btn");
const emailInput = document.querySelector(".your-email input");
const thoughtInput = document.getElementById("user-thought");
const fileInput = document.getElementById("file-input");
const dumpBtn = document.querySelectorAll(".dump-btn");
const Mainwrapper = document.getElementById("main");
const about = document.getElementById("gotoabout")
const themeBtn = document.querySelector('.nav-btn');


themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode'); // this help us to add the light-mode in the every class of the html making it super easy to switch between the dark and light mode ...... i will use this later in the weather app too 
})

dumpBtn.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault() //prevents href from jumping to to the top of the page 
        Mainwrapper.style.display = "flex";
        Mainwrapper.scrollIntoView({ behavior: "smooth" });
    });
});

about.addEventListener("click", () => {
    Mainwrapper.style.display = "none";
})


//main cloud link garney chij
const CLOUDINARY_CLOUD_NAME = "dwu4ldjml";
const CLOUDINARY_UPLOAD_PRESET = "Thought-dump-files";

async function uploadToCloudinary(file) {
    const formData = new FormData(); //yesley chahi form batw data send grna milxw cloud service ma
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
        { method: "POST", body: formData }
    );

    const data = await response.json();
    return data.secure_url;

}

sendBtn.addEventListener("click", async function () {
    const email = emailInput.value.trim();
    const thought = thoughtInput.value.trim();
    // this reduces the space of the typed thing 

    //for warning the user
    if (!email) {
        alert("Please enter your email first.");
        return;
    }
    if (!thought) {
        alert("Please write down your thought first");
        return;
    }
    sendBtn.textContent = "Sending....";
    sendBtn.disabled = true;

    try {
        let fileUrls = [];

        //yedi user ley file pick gryo vaney teslai pahila cloudinary ko cloud ma upload grnih 
        if (fileInput.files.length > 0) {
            sendBtn.textContent = "Uploading..."
            for (const file of fileInput.files) {
                const url = await uploadToCloudinary(file);
                fileUrls.push(url);
            }
        }


        await emailjs.send("service_mruebvt", "template_gym7x8s", {
            to_email: email,
            message: thought,
            attachment_url: fileUrls.length>0 ? fileUrls.join('\n'):"No attachment",  // this attaches the file to the email
        });
        //to tell the user that the thought has been sent out ..
        alert("Your Thought has been sent to your email !! ")
        emailInput.value = "";
        thoughtInput.value = "";
        fileInput.value="";
    } catch (error) {
        alert("Something went wrong !!");
        console.error(error);
    } finally {
        sendBtn.textContent = "send"
        sendBtn.disabled = false;

    }
});