export const isAuthentication = () => {
    return localStorage.getItem('token') !== null;
};

export const getUser = () => {
    const token = localStorage.getItem('token');
    console.log("helo")
    if (!token) {
        return null;
    }

    const payload = JSON.parse(token.split('.')[1]);
    return payload;
};

export const isAdmin = () => {
    const user = getUser();

    return user && user.role === 'admin';
};
