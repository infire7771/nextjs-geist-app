"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            CSV Upload & Scraper
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full">
            <Link href="/upload" className="w-full block">
              <Button className="w-full">
                Upload CSV
              </Button>
            </Link>
          </div>
          <div className="w-full">
            <Link href="/files" className="w-full block">
              <Button className="w-full" variant="outline">
                View Files
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
