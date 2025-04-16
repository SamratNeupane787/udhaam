import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "../components/ui/card";
import { Button } from './ui/button';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
function Submission({startups}) {
  console.log(startups);
  return (
    <div className=" mx-8">
      <h1 className=" py-3 font-bold text-2xl">Your Submissions</h1>
      <div className=" grid  py-3 sm:grid-cols-1 md:grid-cols-3 gap-6">
        {startups.length === 0 ? (
          <p>No Startups Submitted Yet</p>
        ) : (
          startups.map((index) => (
            <Card key={index.id}>
              <CardHeader className="flex flex-row gap-5 space-y-0 pb-2">
                <Image src={index.logo || "/logoipsum.png" } height={60} width={60} />
                <div className=" flex flex-col">
                  <CardTitle className="font-bold text-lg">
                    {index.name}
                  </CardTitle>
                  <CardTitle className="text-sm font-normal text-gray-500">
                    {index.tagline}
                  </CardTitle>
                </div>
                <Badge variant="secondary">{index.category || "SaaS"}</Badge>
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
