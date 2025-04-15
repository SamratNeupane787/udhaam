"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import useStartups from '@/hooks/useStartups';
import { Card } from './ui/card';
import { ArrowUpCircle, Badge, Clock, Trophy } from 'lucide-react';
import Image from 'next/image';

function TrendingStartups() {
  const [trending, setTrending] = useState([])
  const {trendingStartups} = useStartups()
  useEffect(async()=>{
    const response =await trendingStartups()
    if(response){
      console.log(response)
      setTrending(response)
    } 
  },[])

  return (
    <div className="container px-4 pt-12 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Loved by Peoples
          </h2>
          <p className="text-muted-foreground mt-3">
            Discover Trending Startups in Nepal
          </p>
        </div>
        <Button variant="outline" className="bg-blue-700 text-white">
          View all
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trending.map((product) => (
          <Card key={product.id} className="p-6 transition-all hover:shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Image Section */}
              <div className="relative sm:col-span-1 flex justify-center sm:justify-start">
                <Image
                  src={product.image || "/logoipsum.png"}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="rounded-lg object-cover"
                />
                {product.featured && (
                  <Badge className="absolute -top-2 -left-2 bg-primary">
                    <Trophy className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              {/* Content Section */}
              <div className="sm:col-span-3 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                  <h3 className="font-semibold text-xl">{product.name}</h3>
                  <Button
                    variant="ghost"
                    className="h-auto p-2 hover:bg-primary/10 mt-2 sm:mt-0"
                  >
                    <div className="text-center">
                      <ArrowUpCircle className="h-5 w-5 text-primary mb-1" />
                      <span className="text-xs font-medium block">
                        {product.upvotes_count ?? "0"}
                      </span>
                    </div>
                  </Button>
                </div>

                <p className="text-muted-foreground text-sm">
                  {product.description}
                </p>

                <div className="flex items-center gap-4">
                  <Badge variant="secondary">
                    {product.category || "SaaS"}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TrendingStartups;
