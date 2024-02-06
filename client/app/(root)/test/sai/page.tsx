"use client"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tr from-[#6c63ff] to-[#20bee9]">
      Examinator.AI
      <button
        className="btn btn-primary btn-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring focus:border-primary-dark"
        onClick={() => router.push("/dashboard")}
      >
        Get Started
      </button>
    </main>
  )
}
