import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Building2, AlertCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { DownloadIcon } from 'lucide-react'

interface Service {
  darkWeb: boolean
  companyImpersonation: boolean
  threatIntelligence: boolean
}

interface FormData {
  services: Service
  _id: string
  userId: string
  name: string
  description: string
  phone: string
  email: string
  domain: string
  ipAddress: string
  cryptoAddress: string
  createdAt: string
}

interface OrganizationCardsProps {
  forms: FormData[]
}

export default function OrganizationCards({ forms }: OrganizationCardsProps) {
  return (
    <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-4">
      {forms.map((form) => (
        <Card key={form._id} className="bg-[#1a1a2e] text-white border-gray-700">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{form.name}</span>
              <Badge variant="outline" className="text-xs bg-white">
                {new Date(form.createdAt).toLocaleDateString()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400 mb-4">{form.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm truncate">
              <div className=' '>Email:</div>
              <div>{form.email}</div>
              <div>Phone:</div>
              <div>{form.phone}</div>
              {form.domain && (
                <>
                  <div>Domain:</div>
                  <div>{form.domain}</div>
                </>
              )}
              {form.ipAddress && (
                <>
                  <div>IP Address:</div>
                  <div>{form.ipAddress}</div>
                </>
              )}
              {form.cryptoAddress && (
                <>
                  <div>Crypto Address:</div>
                  <div>{form.cryptoAddress}</div>
                </>
              )}
            </div>
            <div className="flex justify-between mt-4">
             <Button className=' bg-blue-500' variant='default' size='default' ><DownloadIcon className=' w-4 h-4'/><span className='m-2'> Download Report </span></Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}