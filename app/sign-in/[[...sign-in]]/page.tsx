import { SignIn } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metata: Metadata = {
  title: 'Image Generator - SingIn',
};

export default function SignInPage() {
  return (
    <div className="flex h-screen bg-white/55 items-center justify-center">
      <div>
        <SignIn
          appearance={{
            variables: { colorPrimary: '#0F172A' },
          }}
        />
      </div>
    </div>
  );
}
