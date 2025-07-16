// 💬 Select elements
let btn = document.querySelector(".btn");
let content = document.querySelector(".content");
let voice = document.querySelector(".voice");

// 🔊 Function to convert text to speech
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-IN"; // Indian English accent
    window.speechSynthesis.speak(text_speak);
}

// 🕰️ Auto wish based on current time
function wishMe() {
    let day = new Date();
    let hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 18) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}
window.addEventListener('load', () => {
    wishMe();
});

// 🎙️ Setup Speech Recognition
let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

// 🎧 On voice result
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerHTML = transcript;
    takeCommand(transcript);
};

// 🎤 On mic button click
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

// 🧠 Command handling function
function takeCommand(message) {
    message = message.toLowerCase().trim();
    btn.style.display = "flex";
    voice.style.display = "none";

    // ✅ Basic greetings
    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello sir what can i help you with?");
    }

    // ✅ Identity-related questions
    else if (
        message.includes("who are you") ||
        message.includes("who r u") ||
        message.includes("ho r u") ||
        message.includes("what are you") ||
        message.includes("your name") ||
        message.includes("identify")
    ) {
        speak("I am Cryston, your virtual crystal-core assistant created by Ayan sir.");
    }

    // ✅ Purpose-related questions
    else if (
        message.includes("why are you") ||
        message.includes("why do you exist") ||
        message.includes("why were you made") ||
        message.includes("purpose") ||
        message.includes("what is your purpose") ||
        message.includes("why did ayan create you") ||
        message.includes("why ayaan created you")
    ) {
        speak("I exist to assist you. Created by Ayan sir to make your tasks easier and smarter.");
    }

    // ✅ Open websites
    else if (
    message.includes("open youtube") ||
    message.includes("youtube")
) {
    speak("Opening YouTube...");
    window.open("https://www.youtube.com/", "_blank");
}

else if (
    message.includes("open instagram") ||
    message.includes("instagram")
) {
    speak("Opening Instagram...");
    window.open("https://www.instagram.com/", "_blank");
}

else if (
    message.includes("open google") ||
    message.includes("google")
) {
    speak("Opening Google...");
    window.open("https://www.google.com/", "_blank");
}

else if (
    message.includes("open gmail") ||
    message.includes("gmail")
) {
    speak("Opening Gmail...");
    window.open("https://mail.google.com/", "_blank");
}

else if (
    message.includes("open linkedin") ||
    message.includes("linkedin")
) {
    speak("Opening LinkedIn...");
    window.open("https://www.linkedin.com/", "_blank");
}

else if (
    message.includes("open pinterest") ||
    message.includes("pinterest")
) {
    speak("Opening Pinterest...");
    window.open("https://www.pinterest.com/", "_blank");
}

else if (
    message.includes("open spotify") ||
    message.includes("spotify")
) {
    speak("Opening Spotify...");
    window.open("https://open.spotify.com/", "_blank");
}


    // ✅ Web-based utility tools
    else if (message.includes("open calculator") || message.includes("calculator")) {
        speak("Opening calculator...");
        window.open("https://www.google.com/search?q=calculator", "_blank");
    } else if (message.includes("open calendar") || message.includes("calendar")) {
        speak("Opening calendar...");
        window.open("https://calendar.google.com", "_blank");
    }

    // ⚠️ Attempt to open local system settings (Mac only, limited support)
    else if (message.includes("open settings") || message.includes("open system settings")) {
        speak("I can try opening settings on supported devices, sir.");
        try {
            window.open("x-apple.systempreferences:");
        } catch (e) {
            speak("Oops, your browser doesn't support this action.");
        }
    }

    // ✅ WhatsApp Web
    else if (message.includes("open whatsapp") || message.includes("whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://web.whatsapp.com", "_blank");
    }

    // 🕓 Get time
    else if (message.includes("open time") || message.includes("time")) {
        let time = new Date().toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
        });
        speak(`${time}`);
    }

    // 📆 Get date
    else if (message.includes("open date") || message.includes("date")) {
        let date = new Date().toLocaleString(undefined, {
            day: "numeric",
            month: "short",
        });
        speak(`date is ${date}`);
    }

    // 🔍 Fallback: Perform Google Search
    else {
        let query = message
            .replace("criston", "")
            .replace("christian", "")
            .replace("kristen", "")
            .replace("kriston", "")
            .trim();

        let finalText = `This is what I found on internet regarding ${query}`;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }
}
