import { Suspense } from "react"
import CSVViewer from "./csv-viewer"

export default function CSVPage({ params }: { params: { filename: string } }) {
  return (
    <Suspense fallback={
      <div className="container mx-auto p-4">
        <div className="p-6 text-center">
          Loading CSV data...
        </div>
      </div>
    }>
      <CSVViewer filename={params.filename} />
    </Suspense>
  )
}
