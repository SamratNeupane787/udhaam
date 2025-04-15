"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useStartups from "@/hooks/useStartups";
import { Card } from "./ui/card";
import { ArrowUpCircle, ArrowDownCircle, Trophy, Clock } from "lucide-react";
import Image from "next/image";
import useUpvotes from "@/hooks/useUpvotes";
import { Badge } from "./ui/badge";

function TrendingStartups() {
  const [trending, setTrending] = useState([]);
  const { trendingStartups } = useStartups();
  const { doUpvote, removeUpvote } = useUpvotes();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTrendingStartups = async () => {
      const response = await trendingStartups();
      if (response) {
        setTrending(response);
      }
    };
    fetchTrendingStartups();
  }, []);

  const handleUpvote = async (startupId) => {
    const response = await doUpvote(startupId, userId);
    if (response) {
      alert("Upvoted successfully");
    } else {
      alert("You have already upvoted");
    }
  };

  const handleDownvote = async (startupId) => {
    const response = await removeUpvote(startupId, userId);
    if (response) {
      alert("Upvote removed");
    } else {
      alert("Unable to remove upvote");
    }
  };

  return (
    <div className="container px-4 pt-12 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Loved by People</h2>
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
       
              <div className="relative shrink-0 sm:col-span-1 flex justify-center sm:justify-start">
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

      
              <div className="sm:col-span-3 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                  <h3 className="font-semibold text-xl">{product.name}</h3>
          
                  <div className="flex gap-3 items-center sm:flex-col">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10 p-2"
                      onClick={() => handleUpvote(product.id)}
                    >
                      <ArrowUpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-primary hover:text-blue-600 transition" />
                    </Button>
                    <span className="text-sm sm:text-base font-medium">
                      {product.upvotes_count ?? "0"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/10 p-2"
                      onClick={() => handleDownvote(product.id)}
                    >
                      <ArrowDownCircle className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground hover:text-red-600 transition" />
                    </Button>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm">
                  {product.description}
                </p>

                <div className="flex items-center gap-4">
                  <Badge variant="secondary">
                    {product.category || "SaaS"}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Launched today</span>
                  </div>
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
