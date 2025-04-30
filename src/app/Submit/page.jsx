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
import { Separator } from "../components/ui/separator";
import { CldUploadWidget } from "next-cloudinary";
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
import useStartups from "@/hooks/useStartups";
import { N } from "framer-motion/dist/types.d-6pKw1mTI";

export default function SubmitStartup() {
  const router = useRouter();
  const { submitStartups } = useStartups();
  const [token,setTOken]= useState()
  useEffect(() => {
    const token = localStorage.getItem("token");
    setTOken(token)
    if (!token) {
      router.push("/auth/sign-up");
    }
  }, []);

  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    category: "",
    description: "",
    logo: null,
    website: "",
    twitter: "",
    linkedin: "",
    launchType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.tagline || !formData.category) {
      alert("Please fill out all required fields.");
      return;
    }

    const data = {
      name: formData.name,
      tagline: formData.tagline,
      category: formData.category,
      description: formData.description,
      logo: formData.logo,
      images: images,
      tags: tags,
      website: formData.website,
      twitter: formData.twitter,
      linkedin: formData.linkedin,
      launchType: formData.launchType,
    };

    try {
      const response = await submitStartups(data, token);
      if (response) {
        alert("Submitted");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
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
              <div className="flex flex-col gap-3 ">
                <div>
                  <label className="text-sm font-medium">Startup Name*</label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your startup's name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Tagline*</label>
                  <Input
                    value={formData.tagline}
                    onChange={(e) =>
                      setFormData({ ...formData, tagline: e.target.value })
                    }
                    placeholder="A short, catchy description (50 characters max)"
                    maxLength={50}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Make it clear and memorable
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium">Category*</label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="ai">
                        Artificial Intelligence
                      </SelectItem>
                      <SelectItem value="productivity">Productivity</SelectItem>
                      <SelectItem value="developer-tools">
                        Developer Tools
                      </SelectItem>
                      <SelectItem value="design-tools">Design Tools</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium">Description*</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe your startup in detail"
                    className="h-32"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Include your value proposition, target audience, and what
                    makes you unique
                  </p>
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
                        <CldUploadWidget
                          uploadPreset="udhaam"
                          onSuccess={(result) => {
                            setFormData((prev) => ({
                              ...prev,
                              logo: result.info.secure_url,
                            }));
                          }}
                        >
                          {({ open }) => (
                            <button
                              type="button"
                              onClick={() => open()}
                              className="cursor-pointer p-4 text-center"
                            >
                              <ImagePlus className="h-6 w-6 mx-auto text-muted-foreground" />
                              <span className="text-xs text-muted-foreground mt-1 block">
                                Upload logo
                              </span>
                            </button>
                          )}
                        </CldUploadWidget>
                      </div>
                      {formData.logo && (
                        <Image
                          src={formData.logo}
                          alt="Uploaded logo"
                          width={96}
                          height={96}
                          className="rounded-md border object-contain"
                        />
                      )}
                      <p className="text-sm text-muted-foreground">
                        Recommended: 200x200px PNG or JPG
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tags & Links */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Tags & Links</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Website*</label>
                    <div className="flex">
                      <div className="bg-muted px-3 py-2 border border-r-0 rounded-l-md">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
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
                        value={formData.twitter}
                        onChange={(e) =>
                          setFormData({ ...formData, twitter: e.target.value })
                        }
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
                        value={formData.linkedin}
                        onChange={(e) =>
                          setFormData({ ...formData, linkedin: e.target.value })
                        }
                        placeholder="LinkedIn profile URL"
                        className="rounded-l-none"
                      />
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
                <div>
                  <label className="text-sm font-medium">Launch Type*</label>
                  <Select
                    value={formData.launchType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, launchType: value })
                    }
                  >
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

            <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
              <Button
                size="lg"
                className="w-full md:w-auto bg-blue-600"
                onClick={handleSubmit}
              >
                Submit for Review
              </Button>
              
            </div>
          </Card>

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
