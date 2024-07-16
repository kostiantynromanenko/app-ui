export const USERNAME_PATTERN = /^[a-zA-Z0-9_]+$/;
export const PASSWORD_PATTERN =
  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).{8,}$/;
export const DATABASE_NAME_PATTERN = /^[a-zA-Z0-9_]+$/;
export const VOLUME_PATTERN = /^\/[^:]+:\/var\/lib\/postgresql\/data$/;
export const PORT_PATTERN =
  /^([1-9][0-9]{3}|[1-5][0-9]{3,4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]):([1-9][0-9]{3}|[1-5][0-9]{3,4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;
