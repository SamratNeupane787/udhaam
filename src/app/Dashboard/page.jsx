"use client"
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { CheckCircle2, Clock, FileText, Rocket, Ticket, XCircle } from "lucide-react";
import { Separator } from '@radix-ui/react-select';
import Submission from '../components/Submission';
import useStartups from '@/hooks/useStartups';
import { Button } from '../components/ui/button';

function page() {
  const stats =0;
  const userId = localStorage.getItem("userid");
  console.log(userId)
  const {myStartups} = useStartups()
  const [startup, setMyStartups] = useState([])

  useEffect(()=>{
    const fetchMyStartups = async()=>{
      const response = await myStartups(userId);
      console.log(response)
      if(response){
        setMyStartups(response)
      }
    }
    fetchMyStartups()
  },[])
  
  return (
    <div>
      <div className="grid m-8 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Submissions
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{startup.length}</div>
            <p className="text-xs text-muted-foreground">
              All startups you've submitted
            </p>
          </CardContent>
        </Card>

        {/*
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.accepted || 0}</div>
            <p className="text-xs text-muted-foreground">
              Successfully approved startups
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected || 0}</div>
            <p className="text-xs text-muted-foreground">
              Declined submissions
            </p>
          </CardContent>
        </Card> */}

        <Separator />
      </div>
      <Submission startups={startup} />
    </div>
  );
}

export default page
