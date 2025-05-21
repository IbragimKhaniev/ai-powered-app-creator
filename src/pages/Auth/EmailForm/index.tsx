
import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

// Email validation schema
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type EmailFormProps = {
  onSubmit: (email: string) => void;
};

const EmailForm: React.FC<EmailFormProps> = React.memo(({ onSubmit }) => {
  // Form initialization with validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  // Memoized submit handler
  const handleSubmit = useCallback(
    form.handleSubmit((data) => {
      onSubmit(data.email);
    }),
    [form, onSubmit]
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center border border-input rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                  <div className="px-3 text-muted-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input 
                    placeholder="email@example.com" 
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
});

EmailForm.displayName = 'EmailForm';

export default EmailForm;
