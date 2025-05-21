import React, { useState, useCallback, useMemo } from 'react';
import AuthCard from './AuthCard';
import EmailForm from './EmailForm';
import CodeVerificationForm from './CodeVerificationForm';
import { AUTH_TEXTS } from './constants';
import { usePostUser, usePostUserLogin } from '@/api/core';
import { useToast } from '@/hooks/use-toast';

/**
 * Authentication page component
 */
const Auth: React.FC = React.memo(() => {
  // State for managing authentication flow
  const [step, setStep] = useState<'email' | 'verification'>('email');
  const [email, setEmail] = useState<string>('');

  const { toast } = useToast();

  const { mutate: postUser } = usePostUser({
    mutation: {
      onSuccess() {
        setStep('verification');

        toast({
          title: AUTH_TEXTS.TOAST_VERIFICATION_SENT_TITLE,
          description: `${AUTH_TEXTS.TOAST_VERIFICATION_SENT_DESCRIPTION} ${email}`,
        });
      },
      onError() {
        toast({
          title: AUTH_TEXTS.TOAST_ERROR_TITLE,
          description: AUTH_TEXTS.TOAST_ERROR_DESCRIPTION,
          variant: 'destructive',
        });
      }
    }
  });

  const { mutate: postUserLogin } = usePostUserLogin({
    mutation: {
      onSuccess() {
        toast({
          title: AUTH_TEXTS.TOAST_SUCCESS_TITLE,
          description: AUTH_TEXTS.TOAST_SUCCESS_DESCRIPTION,
        });
        // Navigate to home page after successful verification
        window.location.href = '/';
      },
      onError() {
        toast({
          title: AUTH_TEXTS.TOAST_ERROR_TITLE,
          description: AUTH_TEXTS.TOAST_ERROR_DESCRIPTION,
          variant: 'destructive',
        });
      }
    }
  });

  // Memoized card title
  const cardTitle = useMemo(() => 
    step === 'email' ? AUTH_TEXTS.EMAIL_STEP_TITLE : AUTH_TEXTS.VERIFICATION_STEP_TITLE,
  [step]);

  // Memoized card description
  const cardDescription = useMemo(() => {
    if (step === 'email') {
      return AUTH_TEXTS.EMAIL_STEP_DESCRIPTION;
    }
    return `${AUTH_TEXTS.VERIFICATION_STEP_DESCRIPTION} ${email}`;
  }, [step, email]);

  // Email submission handler
  const handleEmailSubmit = useCallback((submittedEmail: string) => {
    setEmail(submittedEmail);

    postUser({
      data: {
        email: submittedEmail,
      },
    });
  }, []);

  // Code submission handler
  const handleCodeSubmit = useCallback((code: string) => {
    postUserLogin({
      data: {
        code,
        email,
      }
    });
  }, [email]);

  // Render appropriate form based on the current step
  const renderForm = useMemo(() => {
    if (step === 'email') {
      return <EmailForm onSubmit={handleEmailSubmit} />;
    }
    return <CodeVerificationForm onSubmit={handleCodeSubmit} email={email} />;
  }, [step, email, handleEmailSubmit, handleCodeSubmit]);

  return (
    <AuthCard 
      title={cardTitle} 
      description={cardDescription}
    >
      {renderForm}
    </AuthCard>
  );
});

Auth.displayName = 'Auth';

export default Auth;
