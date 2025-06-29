"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileData {
  name: string
  path: string
}

export default function FilesPage() {
  const router = useRouter()
  const [files, setFiles] = useState<FileData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [triggerStatus, setTriggerStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: string | null;
  }>({
    loading: false,
    error: null,
    success: null,
  })

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/files')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load files')
        }

        setFiles(data.files)
      } catch (err) {
        setError('Failed to load files')
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [])

  const handleTrigger = async (fileName: string) => {
    try {
      setTriggerStatus({
        loading: true,
        error: null,
        success: null,
      })

      const response = await fetch('/api/trigger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to trigger process')
      }

      setTriggerStatus({
        loading: false,
        error: null,
        success: `Processing triggered for ${fileName}`,
      })
    } catch (err) {
      setTriggerStatus({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to trigger process',
        success: null,
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-6 text-center">
            Loading files...
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">CSV Files</CardTitle>
          <Button
            variant="outline"
            onClick={() => router.push('/upload')}
          >
            Upload New File
          </Button>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {triggerStatus.error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{triggerStatus.error}</AlertDescription>
            </Alert>
          )}

          {triggerStatus.success && (
            <Alert className="mb-4">
              <AlertDescription>{triggerStatus.success}</AlertDescription>
            </Alert>
          )}

          {files.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No CSV files uploaded yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files.map((file) => (
                  <TableRow key={file.name}>
                    <TableCell>{file.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => router.push(`/files/${encodeURIComponent(file.name)}`)}
                        >
                          View Data
                        </Button>
                        <Button
                          onClick={() => handleTrigger(file.name)}
                          disabled={triggerStatus.loading}
                        >
                          {triggerStatus.loading ? 'Processing...' : 'Trigger API'}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
