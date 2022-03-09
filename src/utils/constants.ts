import { ErrorKey } from '../types';

export const keyedErrors: Record<ErrorKey, string> = {
    accessTokenMissing: 'Access token is missing',
    emailNotConfirmed: 'Email is not confirmed',
    emailOrPasswordMissing: '`email` or `password` is missing',
    errorWhenInvalidatingTokens: 'Error when invalidating used tokens',
    failedToAuthenticateWithNewPassword:
        'Failed to authenticate with new password',
    failedToCreateToken: 'Failed to create token',
    failedToCreateTokenAndSendEmail:
        'Failed to create token and failed to send email',
    failedToRefreshToken: 'Failed to refresh token',
    failedToSendEmail: 'Failed to send email',
    failedToSetPassword: 'Failed to set password',
    failedToLogout: 'Failed to log out',
    failedToUpdateUser: 'Failed to update user',
    invalidToken: 'Invalid token',
    invalidUserOrPassword: 'User does not exist or password is invalid',
    notAuthenticated: 'Not authenticated',
    publicFaunaKeyMissing: '`publicFaunaKey` is missing',
    refreshTokenLockout:
        'Could not complete request due to refresh token lockout',
    refreshTokenMissing: 'Refresh token is missing',
    tokensNotFound: 'Tokens not found',
    userAlreadyExists: 'User already exists',
    userDoesNotExist: 'User does not exist',
    userRefIsMissing: 'User ref is missing',
    queryError: 'Query error',
};
