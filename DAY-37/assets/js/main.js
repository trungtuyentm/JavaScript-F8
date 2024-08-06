const searchForm = document.querySelector("#search-form");
const searchFormInput = document.querySelector("input");

const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (speechRecognition) {
    searchForm.insertAdjacentHTML(
        "beforeend",
        '<button type="button"><i class="fas fa-microphone"></i></button>'
    );
    const micBtn = document.querySelector("button");
    const micIcon = document.querySelector("i");
    const status = document.querySelector(".status");

    const recognition = new speechRecognition();
    recognition.lang = "vi-VN";

    micBtn.addEventListener("click", micBtnClick);
    function micBtnClick() {
        if (micIcon.classList.contains("fa-microphone")) {
            recognition.start();
        } else {
            recognition.stop();
        }
    }

    recognition.addEventListener("start", startSpeechRecognition);
    function startSpeechRecognition() {
        micIcon.classList.remove("fa-microphone");
        micIcon.classList.add("fa-microphone-slash");
        status.classList.add("show");
        searchFormInput.focus();
    }
    recognition.addEventListener("end", endSpeechRecognition);
    function endSpeechRecognition() {
        micIcon.classList.remove("fa-microphone-slash");
        micIcon.classList.add("fa-microphone");
        status.classList.remove("show");
        searchFormInput.focus();
    }

    recognition.addEventListener("result", resultSpeechRecognition);
    function resultSpeechRecognition(e) {
        // Get search content
        const transcript = e.results[0][0].transcript.trim().toLowerCase();
        searchFormInput.value = transcript;

        // Keyword
        const urlWeb = {
            google: "https://www.google.com/",
            facebook: "https://www.facebook.com/",
            youtube: "https://www.youtube.com/",
            "google drive": "https://drive.google.com/",
            "google maps": "https://www.google.com/maps",
            "bản đồ": "https://www.google.com/maps",
        };
        const directionKeywords = [
            "chỉ đường",
            "tới",
            "đường tới",
            "chỉ đường tới",
            "đi vô",
            "đi vào",
        ];
        const songKeywords = ["bài hát", "mở bài hát", "nghe bài hát"];
        const videoKeywords = ["video", "mở video", "xem video"];

        // Handle keyword
        let matchedDirectionKeyword = directionKeywords.find((keyword) =>
            transcript.includes(keyword)
        );
        let matchedSongKeyword = songKeywords.find((keyword) =>
            transcript.includes(keyword)
        );
        let matchedVideoKeyword = videoKeywords.find((keyword) =>
            transcript.includes(keyword)
        );

        // Open Google, Facebook, Youtube, google drive, google maps website
        if (urlWeb[transcript]) {
            setTimeout(() => {
                window.open(urlWeb[transcript], "_blank");
            }, 1000);
        }

        // Open Google Maps with the location you want to go to
        else if (matchedDirectionKeyword) {
            const destination = transcript
                .split(matchedDirectionKeyword)[1]
                .trim();
            if (destination) {
                setTimeout(() => {
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        destination
                    )}`;
                    window.open(mapsUrl, "_blank");
                }, 1000);
            }
        }

        // Open the ZingMp3 website with the requested song
        else if (matchedSongKeyword) {
            const song = transcript.split(matchedSongKeyword)[1].trim();
            if (song) {
                setTimeout(() => {
                    const zingMp3Url = `https://zingmp3.vn/tim-kiem/tat-ca?q=${encodeURIComponent(
                        song
                    )}`;
                    window.open(zingMp3Url, "_blank");
                }, 1000);
            }
        }

        // Open the YouTube website with the required video
        else if (matchedVideoKeyword) {
            const video = transcript.split(matchedVideoKeyword)[1].trim();
            if (video) {
                setTimeout(() => {
                    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
                        video
                    )}`;
                    window.open(youtubeUrl, "_blank");
                }, 1000);
            }
        }

        // Secret information. Requires administrator level access
        else {
            setTimeout(() => {
                if (
                    confirm(
                        "Không thực hiện được yêu cầu do là thông tin mật. Để tránh người khác nghe thấy bạn hãy nhập thông tin bạn cần tìm kiếm hoặc Bạn có muốn tìm kiếm giọng nói với tư cách admin không?"
                    )
                ) {
                    const password = prompt(
                        "Nhập mật khẩu để tìm kiếm với tư cách admin (MK: 999):",
                        ""
                    );
                    if (password === "999") {
                        searchForm.submit();
                    } else {
                        alert("Mật khẩu không chính xác. Yêu cầu đã bị hủy.");
                    }
                } else {
                    alert("Yêu cầu đã bị hủy.");
                }
            }, 1000);
        }
    }

    // The user does not grant access to the microphone
    recognition.addEventListener("error", errorSpeechRecognition);
    function errorSpeechRecognition(e) {
        if (e.error === "not-allowed" || e.error === "permission-denied") {
            alert(
                "Truy cập micro bị từ chối. Vui lòng cấp quyền truy cập micro để sử dụng chức năng này."
            );
        }
    }
}
