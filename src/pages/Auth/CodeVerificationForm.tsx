
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Check } from 'lucide-react';

const formSchema = z.object({
  code: z.string().min(6, {
    message: 'Verification code must be 6 digits.',
  }),
});

type CodeVerificationFormProps = {
  onSubmit: (code: string) => void;
  email: string;
};

const CodeVerificationForm: React.FC<CodeVerificationFormProps> = ({ onSubmit, email }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: '',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data.code);
  });

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
          <Button type="submit" className="w-full">
            <Check className="mr-2 h-4 w-4" /> Verify Code
          </Button>
          
          <Button 
            type="button" 
            variant="ghost" 
            className="text-sm"
            onClick={() => {
              // In a real application, this would trigger resending the verification code
              form.reset();
            }}
          >
            Resend Code
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CodeVerificationForm;
