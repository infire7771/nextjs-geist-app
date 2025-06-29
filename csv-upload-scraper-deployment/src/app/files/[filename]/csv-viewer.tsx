"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CSVData {
  [key: string]: string
}

interface RowData extends CSVData {
  id: string
}

interface ScrapedRowData {
  data: RowData
  scraped: boolean
}

export default function CSVViewer({ filename }: { filename: string }) {
  const router = useRouter()
  const [rows, setRows] = useState<ScrapedRowData[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Load CSV data when filename is available
  useEffect(() => {
    if (!filename) return

    const loadCSVData = async () => {
      try {
        const response = await fetch(`/api/csv/${filename}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load CSV data')
        }

        setHeaders(data.headers)
        setRows(data.rows.map((row: RowData) => ({ 
          data: row,
          scraped: false 
        })))
        setLoading(false)
      } catch (err) {
        setError('Failed to load CSV data')
        setLoading(false)
      }
    }

    loadCSVData()
  }, [filename])

  const handleScrape = async (rowId: string) => {
    try {
      setSuccess(null)
      setError(null)

      // Mark the current row as scraped
      setRows(prevRows =>
        prevRows.map(row =>
          row.data.id === rowId ? { ...row, scraped: true } : row
        )
      )

      // Move to the next row
      setCurrentIndex(prev => {
        const nextIndex = prev + 1
        if (nextIndex < rows.length) {
          return nextIndex
        }
        // If we've reached the end, stay at the last index
        return prev
      })

      // Send request to trigger API before updating UI
      const response = await fetch(`/api/trigger`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename,
          row: currentRow.data,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to trigger scraping')
      }

      // Update UI after successful API call
      setSuccess('Row marked as scraped')
      
      // Update rows state to mark current row as scraped
      setRows(prevRows =>
        prevRows.map(row =>
          row.data.id === rowId ? { ...row, scraped: true } : row
        )
      )
      
      // Move to next row
      const nextIndex = currentIndex + 1
      if (nextIndex < rows.length) {
        setCurrentIndex(nextIndex)
      }
    } catch (err) {
      setError('Failed to process scraping')
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-6 text-center">
            Loading CSV data...
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentRow = rows[currentIndex]
  const hasMoreRows = currentIndex < rows.length - 1
  const unscrapedRows = rows.filter(row => !row.scraped)

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            {filename}
          </CardTitle>
          <div className="text-sm text-gray-500">
            {unscrapedRows.length} rows remaining
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          
          {currentRow && !currentRow.scraped && (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {headers.map((header) => (
                    <TableRow key={header}>
                      <TableCell className="font-medium">{header}</TableCell>
                      <TableCell>{currentRow.data[header]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => router.push('/files')}
                >
                  Back to Files
                </Button>
                <Button
                  onClick={() => handleScrape(currentRow.data.id)}
                >
                  Scrape
                </Button>
              </div>
            </div>
          )}

          {(!currentRow || currentRow.scraped) && !hasMoreRows && (
            <div className="text-center space-y-4">
              <p className="text-gray-500">All rows have been processed!</p>
              <Button
                variant="outline"
                onClick={() => router.push('/files')}
              >
                Back to Files
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
