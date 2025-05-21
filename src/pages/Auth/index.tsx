
import React, { useState, useCallback, useMemo } from 'react';
import AuthCard from './AuthCard';
import EmailForm from './EmailForm';
import CodeVerificationForm from './CodeVerificationForm';
import { AUTH_TEXTS } from './constants';
import { sendVerificationCode, handleVerificationSubmit } from './utils/authUtils';

/**
 * Authentication page component
 */
const Auth: React.FC = React.memo(() => {
  // State for managing authentication flow
  const [step, setStep] = useState<'email' | 'verification'>('email');
  const [email, setEmail] = useState<string>('');

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
    setStep('verification');
    sendVerificationCode(submittedEmail);
  }, []);

  // Code submission handler
  const handleCodeSubmit = useCallback((code: string) => {
    handleVerificationSubmit(code);
  }, []);

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
