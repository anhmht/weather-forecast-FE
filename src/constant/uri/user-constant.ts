export default {
    login: '/api/Account/authenticate',
    register: '/api/Account/register',
    updateUserInfo: '/api/Account/updateProfile',
    getPosts: '/api/Event/GetAllEvents',
    post: '/api/Event',
    postId: '/api/Event/:id',
    postCategoryStatus: '/api/Event/GetEventsBy',
    category: '/api/Category',
    categoryId: '/api/Category/:id',
    getCurrentLocation: '/api/Common/Location/GetCurrentLocation'
}
