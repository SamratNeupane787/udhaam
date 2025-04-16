"use client";

import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowUpCircle, Trophy, Clock } from "lucide-react";
import Image from "next/image";
import useStartups from "@/hooks/useStartups";
import useUpvotes from "@/hooks/useUpvotes";

function Featured() {
  const [startups, setStartups] = useState([]);
  const [upvotedMap, setUpvotedMap] = useState({});
  const { doUpvote } = useUpvotes(); 
  const { getStartups } = useStartups();
  
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userid") : null;

  useEffect(() => {
    const fetchStartups = async () => {
      const response = await getStartups();
      if (Array.isArray(response)) {
        setStartups(response);
        const initialMap = {};
        response.forEach((startup) => {
          initialMap[startup.id] = false;
        });
        setUpvotedMap(initialMap);
      }
    };

    fetchStartups();
  }, []);

const handleUpvote = async (startupId) => {
  const response = await doUpvote(startupId, userId);
  console.log(response);
  if (response && response.message) {
    const isRemoving = response.message === "Upvote removed successfully";
    setUpvotedMap((prev) => ({
      ...prev,
      [startupId]: !isRemoving,
    }));
    setStartups((prev) =>
      prev.map((s) =>
        s.id === startupId
          ? {
              ...s,
              upvotes_count: Math.max(
                0,
                (s.upvotes_count || 0) + (isRemoving ? -1 : 1)
              ),
            }
          : s
      )
    );

    await fetchStartups();
  } else {
    alert("Failed to upvote. Try again.");
  }
};
  return (
    <div className="container px-4 pt-12 mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Featured Today</h2>
          <p className="text-muted-foreground">
            Discover today's most exciting launches
          </p>
        </div>
        <Button variant="outline" className="bg-blue-700 text-white">
          View all
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((product) => (
          <Card key={product.id} className="p-6 transition-all hover:shadow-lg">
            <div className="flex gap-6">
              <div className="relative shrink-0">
                <Image
                  src={product.logo || "/logoipsum.png"}
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

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-xl">{product.name}</h3>
                    <Button
                      variant="ghost"
                      className="h-auto p-2 hover:bg-primary/5"
                    >
                      <div
                        className="text-center"
                        onClick={() => handleUpvote(product.id)}
                      >
                        <ArrowUpCircle
                          className={`h-5 w-5 mb-1 cursor-pointer transition ${
                            upvotedMap[product.id]
                              ? "text-blue-600"
                              : "text-primary"
                          }`}
                        />
                        <span className="text-xs font-medium block">
                          {product.upvotes_count ?? 0}
                        </span>
                      </div>
                    </Button>
                  </div>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

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

export default Featured;
