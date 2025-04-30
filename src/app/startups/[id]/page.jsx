'use client'
import React, { use, useEffect, useState } from 'react'
import useStartups from '@/hooks/useStartups'
import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { ChevronUp, ExternalLink ,Calendar, Badge,Tag} from 'lucide-react'
import { Card,CardHeader,CardTitle, CardDescription,CardContent,CardFooter  } from '@/app/components/ui/card'
function page({params}) {
  const {oneStartup} = useStartups()
  const [startupD, setStartupD] = useState([])
  const {id} = use(params)
  useEffect(()=>{
    const fetchStartup = async()=>{
      const response = await oneStartup(id)
      if(!response){
        alert("Error fetching startups!")
      }
      console.log(response.data)
      setStartupD(response.data);
    }
    fetchStartup()
  },[])
  return (
    <div className="grid grid-cols-1 gap-3 py-8 px-12 md:grid-cols-5 sm:grid-cols-1">
      <div className=" col-span-3">
        <div className="flex flex-row gap-3 items-center">
          <div>
            <Button className="bg-blue-700">
              <ChevronUp />2
            </Button>
          </div>
          <div>
            <Image src="/logoipsum.png" height={72} width={72} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Startup Name</h1>
            <p className=" py-1 text-slate-500 text-lg">
              AI Powered design tool that transforms your ideas into stunning
              visuals
            </p>
          </div>
        </div>
        <div className=" pt-12 flex flex-col">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              Design Tools
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              AI
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              Productivity
            </Badge>
          </div>
          <h1 className=" text-2xl font-bold tracking-wider">
            About Startup Name
          </h1>
          <p className=" text-lg pt-3">
            Designify AI is a revolutionary design tool that uses artificial
            intelligence to transform your ideas into stunning visuals in
            seconds. Whether you're a professional designer looking to speed up
            your workflow or a non-designer who needs beautiful graphics,
            Designify AI makes design accessible to everyone. With our advanced
            AI algorithms, you can generate logos, social media posts, website
            mockups, and more with just a few clicks. Our tool understands
            design principles and applies them automatically, ensuring that your
            creations are not only beautiful but also effective. Designify AI
            integrates seamlessly with popular design tools and platforms,
            allowing you to export your creations in various formats and
            continue editing them in your preferred software.
          </p>
        </div>
      </div>
      <Card className="col-span-2 w-full py-8">
        <CardHeader>
          <CardTitle>Get Designify AI</CardTitle>
          <CardDescription>Available on web, iOS, and Android</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full bg-blue-700">Visit Website</Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              App Store
            </Button>
            <Button variant="outline" className="flex-1">
              Google Play
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            designify-ai.com
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Launched Apr 2023
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default page
