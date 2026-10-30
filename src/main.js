import { validateNickname, createPlayer } from "./players.js";

const form = document.querySelector("#player-form");
const nicknameInput = document.querySelector("#player-name");
const avatarOptions = document.querySelector("#avatar-options");
const playersList = document.querySelector("#players-list");
const formError = document.querySelector("#form-error");

let selectedAvatar = "king";

// اختيار Avatar
avatarOptions.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-avatar]");

    if (!button) return;

    selectedAvatar = button.dataset.avatar;

    avatarOptions.querySelectorAll("button").forEach(function (avatar) {
        avatar.classList.remove("border-2", "border-[#8B2E22]");
    });

    button.classList.add("border-2", "border-[#8B2E22]");
});
