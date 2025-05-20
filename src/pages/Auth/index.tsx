
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EmailForm from './EmailForm';
import CodeVerificationForm from './CodeVerificationForm';
import Logo from '@/components/Logo';
import { toast } from '@/hooks/use-toast';

const Auth: React.FC = () => {
  const [step, setStep] = useState<'email' | 'verification'>('email');
  const [email, setEmail] = useState<string>('');

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep('verification');
    toast({
      title: "Verification code sent",
      description: `A verification code has been sent to ${submittedEmail}`,
    });
    // In a real application, here we would call an API to send the verification code
  };

  const handleCodeSubmit = (code: string) => {
    console.log('Verification code submitted:', code);
    // In a real application, here we would verify the code
    toast({
      title: "Success!",
      description: "You have been successfully authenticated",
    });
    // Navigate to home page after successful verification
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {step === 'email' ? 'Sign In' : 'Verify Your Email'}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 'email' 
                ? 'Enter your email address to continue' 
                : `Enter the verification code sent to ${email}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 'email' ? (
              <EmailForm onSubmit={handleEmailSubmit} />
            ) : (
              <CodeVerificationForm onSubmit={handleCodeSubmit} email={email} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
