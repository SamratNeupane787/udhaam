'use client'
import React, { use, useEffect, useState } from 'react'
import useStartups from '@/hooks/useStartups'
import Image from 'next/image'
import { Button } from '@/app/components/ui/button'
import { ChevronUp, ExternalLink } from 'lucide-react'
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
    <div>
      <div className="flex items-center justify-center   sm:flex-col  md:flex-row mx-12 py-8 ">
        <div className=" flex flex-row items-center gap-4">
          <Image
            src={startupD.logo || "/logoipsum.png"}
            height={60}
            width={60}
          />
          <h1 className=" text-2xl font-semibold">{startupD.name}</h1>
        </div>
        <div className=" flex flex-row gap-8">
          <Button
            variant="ghost"
            size="lg"
            className="h-7 gap-1"
            href={startupD.websitelink}
          >
            <ExternalLink className="h-8 w-8" />
            <span>Website Link</span>
          </Button>

          <div className=" flex flex-row gap-8 ">
            <Button size="lg" className="h-7 gap-1 bg-blue-700">
              <ChevronUp className="h-8 w-8" />
              <span>{startupD.category || "SaaS"}</span>
            </Button>
            <Button size="lg" className="h-7 gap-1 bg-blue-700">
              <ChevronUp className="h-8 w-8" />
              <span>{startupD.upvotes_count || "0"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page
