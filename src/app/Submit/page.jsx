"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  ImagePlus,
  Globe,
  Twitter,
  Linkedin,
  Upload,
  X,
  AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubmitStartup() {
  const router = useRouter()
  
  
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/sign-up");
    }
  },[])

  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 5));
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && tagInput && tags.length < 5) {
      e.preventDefault();
      if (!tags.includes(tagInput.toLowerCase())) {
        setTags((prev) => [...prev, tagInput.toLowerCase()]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-muted/50 py-12 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="space-y-6">
        
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Submit Your Startup
            </h1>
            <p className="text-muted-foreground">
              Share your startup with our community and get valuable feedback
            </p>
          </div>

          <Card className="p-6">
          
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Startup Name*</label>
                    <Input placeholder="Enter your startup's name" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Tagline*</label>
                    <Input
                      placeholder="A short, catchy description (50 characters max)"
                      maxLength={50}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Make it clear and memorable
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Category*</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="ai">
                          Artificial Intelligence
                        </SelectItem>
                        <SelectItem value="productivity">
                          Productivity
                        </SelectItem>
                        <SelectItem value="developer-tools">
                          Developer Tools
                        </SelectItem>
                        <SelectItem value="design-tools">
                          Design Tools
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description*</label>
                    <Textarea
                      placeholder="Describe your startup in detail"
                      className="h-32"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Include your value proposition, target audience, and what
                      makes you unique
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Media */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Media</h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Startup Logo*
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="h-24 w-24 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="cursor-pointer p-4 text-center"
                        >
                          <ImagePlus className="h-6 w-6 mx-auto text-muted-foreground" />
                          <span className="text-xs text-muted-foreground mt-1 block">
                            Upload logo
                          </span>
                        </label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Recommended: 200x200px PNG or JPG
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Screenshots & Media (up to 5)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={image.name}
                            width={200}
                            height={150}
                            className="rounded-lg object-cover w-full h-[150px]"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 p-1 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {images.length < 5 && (
                        <div className="h-[150px] rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            id="image-upload"
                            onChange={handleImageUpload}
                          />
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer p-4 text-center"
                          >
                            <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                            <span className="text-xs text-muted-foreground mt-1 block">
                              Upload images
                            </span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

            
              <div>
                <h2 className="text-xl font-semibold mb-4">Tags & Links</h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Tags (up to 5)
                    </label>
                    <div className="space-y-2">
                      <Input
                        placeholder="Add tags (press Enter)"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagAdd}
                      />
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => removeTag(tag)}
                          >
                            {tag}
                            <X className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Website*</label>
                      <div className="flex">
                        <div className="bg-muted px-3 py-2 border border-r-0 rounded-l-md">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          placeholder="https://your-startup.com"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Twitter/X</label>
                      <div className="flex">
                        <div className="bg-muted px-3 py-2 border border-r-0 rounded-l-md">
                          <Twitter className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          placeholder="@yourstartup"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">LinkedIn</label>
                      <div className="flex">
                        <div className="bg-muted px-3 py-2 border border-r-0 rounded-l-md">
                          <Linkedin className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          placeholder="LinkedIn profile URL"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Launch Preferences */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Launch Preferences
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Launch Type*</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select launch type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public Launch</SelectItem>
                        <SelectItem value="private">
                          Private Launch (Coming Soon)
                        </SelectItem>
                        <SelectItem value="schedule">
                          Schedule for Later
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex items-center gap-4">
              <Button size="lg" className="w-full md:w-auto">
                Submit for Review
              </Button>
              <Button variant="outline" size="lg" className="w-full md:w-auto">
                Save as Draft
              </Button>
            </div>
          </Card>

          {/* Guidelines */}
          <Card className="p-6 bg-muted/50">
            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-primary shrink-0" />
              <div className="space-y-2">
                <h3 className="font-medium">Submission Guidelines</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ensure all required fields (*) are completed</li>
                  <li>
                    • Provide high-quality images and accurate information
                  </li>
                  <li>• Review our community guidelines before submitting</li>
                  <li>
                    • Submissions are typically reviewed within 24-48 hours
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
