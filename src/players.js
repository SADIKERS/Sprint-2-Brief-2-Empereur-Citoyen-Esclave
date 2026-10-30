export function validateNickname(nickname){
    const regex = /^[A-Za-z0-9_]{3,12}$/;

    return regex.test(nickname);
}

export function createPlayer(nickname, avatar) {
    return {
        id: Date.now(),
        nickname: nickname,
        avatar: avatar,
        isActive: false
    };
}