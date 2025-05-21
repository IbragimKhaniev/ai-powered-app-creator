
import { toast } from '@/hooks/use-toast';
import { AUTH_TEXTS } from '../constants';

/**
 * Send verification code to the provided email
 * @param email User email
 */
export const sendVerificationCode = (email: string) => {
  toast({
    title: AUTH_TEXTS.TOAST_VERIFICATION_SENT_TITLE,
    description: `${AUTH_TEXTS.TOAST_VERIFICATION_SENT_DESCRIPTION} ${email}`,
  });
  // In a real application, here we would call an API to send the verification code
};

/**
 * Handle verification code submission
 * @param code Verification code
 */
export const handleVerificationSubmit = (code: string) => {
  console.log('Verification code submitted:', code);
  // In a real application, here we would verify the code
  toast({
    title: AUTH_TEXTS.TOAST_SUCCESS_TITLE,
    description: AUTH_TEXTS.TOAST_SUCCESS_DESCRIPTION,
  });
  // Navigate to home page after successful verification
  window.location.href = '/';
};
