import React from 'react'
import { Button } from './ui/button';
import { Rocket } from 'lucide-react';
import Link from 'next/link';
function Footer() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to launch your <span className=' text-red-500'>startup?</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join other entrepreneur who have successfully launched on our
            platform
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/sign-up">
              <Button size="lg" className="text-lg bg-blue-600">
                Submit Your Startup
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Footer
