"use client"

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OrganizationCards from "./cards";
import Cookies from "js-cookie";

interface Service {
  darkWeb: boolean;
  companyImpersonation: boolean;
  threatIntelligence: boolean;
}

interface FormData {
  services: Service;
  _id: string;
  userId: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  domain: string;
  ipAddress: string;
  cryptoAddress: string;
  createdAt: string;
}

export default function OrganizationManager() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
    domain: "",
    ipAddress: "",
    cryptoAddress: "",
  });
  const [organizations, setOrganizations] = useState<FormData[]>([]);

  // Fetch organizations when component mounts
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const token = Cookies.get("token");
        
        if (!token) {
          throw new Error("User is not authenticated");
        }

        const response = await fetch("/api/form", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch organizations");
        }

        const data = await response.json();
        setOrganizations(data.forms); // Assuming the API returns a structure similar to the one you provided
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create organization");
      }

      const newOrganization = await response.json();
      setOrganizations((prev) => [...prev, newOrganization]); // Add new organization to state
      setFormData({
        name: "",
        description: "",
        phone: "",
        email: "",
        domain: "",
        ipAddress: "",
        cryptoAddress: "",
      });
      setStep(1);
    } catch (error) {
      console.error("Error creating organization:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end items-center mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">+ New Organization</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-[#0e0e1f] text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">New Organization</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="col-span-3 bg-[#1a1a2e] border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="col-span-3 bg-[#1a1a2e] border-gray-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="col-span-3 bg-[#1a1a2e] border-gray-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="col-span-3 bg-[#1a1a2e] border-gray-700 text-white"
                    />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="domain" className="text-right">
                      Domain
                    </Label>
                    <Input
                      id="domain"
                      name="domain"
                      value={formData.domain}
                      onChange={handleInputChange}
                      className="col-span-3 bg-[#1a1a2e] border-gray-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ipAddress" className="text-right">
                      IP Address
                    </Label>
                    <Input
                      id="ipAddress"
                      name="ipAddress"
                      value={formData.ipAddress}
                      onChange={handleInputChange}
                      className="col-span-3 bg-[#1a1a2e] border-gray-700 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="cryptoAddress" className="text-right">
                      Crypto Address
                    </Label>
                    <Input
                      id="cryptoAddress"
                      name="cryptoAddress"
                      value={formData.cryptoAddress}
                      onChange={handleInputChange}
                      className="col-span-3 bg-[#1a1a2e] border-gray-700 text-white"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="bg-gray-700 text-white hover:bg-gray-600"
                  >
                    Back
                  </Button>
                )}
                {step < 2 ? (
                  <Button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="bg-green-500 hover:bg-green-600">
                    Create Organization
                  </Button>
                )}
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <OrganizationCards forms={organizations} />
    </div>
  );
}
