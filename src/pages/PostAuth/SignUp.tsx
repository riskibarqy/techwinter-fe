import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function PostSignup() {
  const { user } = useUser();
  const [status, setStatus] = useState<'idle' | 'saving' | 'done'>('idle');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const appId = searchParams.get('app_id');
    if (user && appId) {
      setStatus('saving');
      user.update({ unsafeMetadata: { app_id: [appId] } })
        .then(() => {
          setStatus('done');
          navigate('/dashboard');
        })
        .catch(() => {
          setStatus('idle');
          // optionally handle error
        });
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-gray-700">
      <Loader2 className={`animate-spin h-8 w-8 mb-4 ${status === 'done' ? 'hidden' : ''}`} />
      <p className="text-lg">
        {status === 'saving' ? 'Finalizing your registration...' : 'Preparing...'}
      </p>
    </div>
  );
}
