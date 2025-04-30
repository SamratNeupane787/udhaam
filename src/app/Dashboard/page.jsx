"use client"; // Ensures the component is rendered on the client

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { FileText } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import Submission from "../components/Submission";
import useStartups from "@/hooks/useStartups";

function Page() {
  const [startup, setMyStartups] = useState([]);
  const { myStartups } = useStartups();
  const [userId, setUserId] = useState(null); // State to store the userId

  useEffect(() => {
    // Check if we're on the client (the window object is only available in the browser)
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userid");
      if (storedUserId) {
        setUserId(storedUserId); // Set the userId if it exists in localStorage
      }
    }
  }, []); // This runs only once when the component mounts on the client

  useEffect(() => {
    if (userId) {
      const fetchMyStartups = async () => {
        try {
          const response = await myStartups(userId);
          console.log(response);
          if (response) {
            setMyStartups(response);
          }
        } catch (error) {
          console.error("Failed to fetch startups:", error);
        }
      };

      fetchMyStartups();
    }
  }, [userId]); 

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
        <Separator />
      </div>

      <Submission startups={startup} />
    </div>
  );
}

export default Page;
