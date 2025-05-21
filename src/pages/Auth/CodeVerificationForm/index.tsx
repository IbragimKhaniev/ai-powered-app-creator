
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Check, Loader } from 'lucide-react';

// Verification code validation schema
const formSchema = z.object({
  code: z.string().min(6, {
    message: 'Код подтверждения должен состоять из 6 цифр.',
  }),
});

type CodeVerificationFormProps = {
  onSubmit: (code: string) => void;
  email: string;
  isLoading?: boolean;
};

const CodeVerificationForm: React.FC<CodeVerificationFormProps> = React.memo(({ onSubmit, email, isLoading }) => {
  // Form initialization with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  // Memoized submit handler
  const handleSubmit = useCallback(
    form.handleSubmit((data) => {
      onSubmit(data.code);
    }),
    [form, onSubmit]
  );

  // Memoized reset handler
  const handleReset = useCallback(() => {
    // In a real application, this would trigger resending the verification code
    form.reset();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP 
                  maxLength={6} 
                  {...field}
                  disabled={isLoading}
                  className="justify-center"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Проверка...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" /> Подтвердить код
              </>
            )}
          </Button>
          
          <Button 
            type="button" 
            variant="ghost" 
            className="text-sm"
            onClick={handleReset}
            disabled={isLoading}
          >
            Отправить код повторно
          </Button>
        </div>
      </form>
    </Form>
  );
});

CodeVerificationForm.displayName = 'CodeVerificationForm';

export default CodeVerificationForm;
