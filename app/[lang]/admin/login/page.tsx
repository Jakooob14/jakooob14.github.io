'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {  
    const router = useRouter();
    
    useEffect(() => {
        const password = window.prompt('Enter admin password to access the admin panel');
        
       const login = async () => {
           try {
               const response = await fetch('/api/auth', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json',
                   },
                   body: JSON.stringify({ password }),
               });

               if (response.status === 200) {
                   router.push('/admin/markdown');
               } else {
                   alert('Login failed');
               }
           } catch (err) {
               alert('Login failed');
               console.error(err);
           }
       };
       
       login();
    }, []);
    
    return <></>;
}