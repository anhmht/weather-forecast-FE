export default {
    login: '/api/Account/authenticate',
    register: '/api/Account/register',
    updateUserInfo: '/api/Account/updateProfile',
    getAllUser: '/api/Account/GetAllUsers',
    createUser: '/api/Account/createUser',
    getAllRole: '/api/Account/GetAllRoles',
    getUserInfo: '/api/Account/get-user-info',
    forgotPassword: '/api/Account/forgot-password',
    resetPassword: '/api/Account/reset-password',
    resendEmail: '/api/Account/resend-verification-email',
    confirmEmail: '/api/Account/confirm-email',
    changePassword: '/api/Account/change-password',
    deleteUser: '/api/Account/:email',
    getUserInfoByUserId: '/api/Account/get-user-detail/:userId'
}
