import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "../components/ui/card";
import { Button } from './ui/button';
import Image from 'next/image';
import { ExternalLink, Rocket } from 'lucide-react';
import { Badge } from './ui/badge';
import { useRouter } from 'next/navigation';
function Submission({startups}) {
  const router = useRouter()
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token){
      router.push('/auth/sign-up')
    }
  },[])
  return (
    <div className=" mx-8">
      <div className=" flex items-center gap-8 sm:flex-col md:flex-row">
        <h1 className=" py-3 font-bold text-2xl">Your Submissions</h1>
        <Button
          size="lg"
          className="bg-blue-600 w-full sm:w-auto"
          onClick={()=>{router.push('/Submit')}}
        >
          Submit Your Startup
          <Rocket className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className=" grid  py-3 sm:grid-cols-1 md:grid-cols-3 gap-6">
        {startups.length === 0 ? (
          <p>No Startups Submitted Yet</p>
        ) : (
          startups.map((index) => (
            <Card key={index.id}>
              <CardHeader className="flex flex-row gap-5 space-y-0 pb-2">
                <Image
                  src={index.logo || "/logoipsum.png"}
                  height={60}
                  width={60}
                />
                <div className=" flex flex-col">
                  <CardTitle className="font-bold text-lg">
                    {index.name}
                  </CardTitle>
                  <CardTitle className="text-sm font-normal text-gray-500">
                    {index.tagline}
                  </CardTitle>
                </div>
                <div className=' flex flex-col gap-8 '>
                  <Badge variant="secondary">{index.category || "SaaS"}</Badge>
                  <Badge variant="secondary">
                    Upvotes: {index.upvotes_count || "0"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Submitted:{new Date(index.created_at).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between pt-2">
                <Button variant="ghost" size="sm" className="h-7 gap-1 ">
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Details</span>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Submission
