"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Plus,
  FileText,
  Edit2,
  Trash2,
  Clock,
  MoreVertical,
  ExternalLink
} from "lucide-react";
import { useResumes } from "@/hooks/use-resumes";
import { formatDate, truncate, cn } from "@/lib/utils";

interface DashboardClientProps {
  userId: string;
  userName: string;
}

export function DashboardClient({ userId, userName }: DashboardClientProps) {
  const { resumes, isLoading, deleteResume } = useResumes(userId);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    setDeletingId(id);
    try {
      await deleteResume(id);
      toast.success("Resume deleted");
    } catch {
      toast.error("Failed to delete resume");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-4rem)] bg-[#f8fafc] dark:bg-background">
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center sm:text-left"
      >
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Hi, <span className="text-primary">{userName.split(" ")[0]}</span> 👋
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          View, edit, and manage your resumes below.
        </p>
      </motion.div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="aspect-[1/1.2] rounded-xl bg-muted animate-pulse" />
          <div className="aspect-[1/1.2] rounded-xl bg-muted animate-pulse" />
        </div>
      )}

      {/* Main Grid */}
      {!isLoading && (
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {/* Create New Card (Always First) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
            }}
          >
            <Link
              href="/templates"
              className="group flex flex-col items-center justify-center h-full aspect-[1/1.4] sm:aspect-[1/1.3] bg-card border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-300 relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                New Resume
              </h3>
              <p className="text-xs text-muted-foreground mt-1">Start from template</p>
            </Link>
          </motion.div>

          {/* Existing Resumes */}
          <AnimatePresence>
            {resumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 aspect-[1/1.4] sm:aspect-[1/1.3] focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
              >
                {/* Document Preview Area (Mock) */}
                <div className="flex-1 bg-muted/40 p-4 relative overflow-hidden flex flex-col">
                  {/* Subtle document graphic */}
                  <div className="w-10 h-10 rounded-lg bg-background border border-border shadow-sm flex items-center justify-center mb-4 z-10">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="z-10 flex-1">
                    <h3 className="font-semibold text-foreground text-base leading-tight mb-1">
                      {truncate(resume.title, 40)}
                    </h3>
                    <p className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                      {resume.template}
                    </p>
                  </div>
                  
                  {/* Decorative background blocks indicating a resume layout */}
                  <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.03] transform rotate-12 pointer-events-none">
                     <FileText style={{ width: '180px', height: '180px' }} />
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="bg-card border-t border-border p-3 flex items-center justify-between z-20">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                    <Clock className="h-3 w-3" />
                    {formatDate(resume.updatedAt)}
                  </div>

                  <div className="flex items-center gap-1">
                    <Link
                      href={`/builder?id=${resume.id}`}
                      className="p-1.5 rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors focus:outline-none"
                      title="Edit Resume"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Link>
                    <button
                      disabled={deletingId === resume.id}
                      onClick={() => handleDelete(resume.id, resume.title)}
                      className={cn(
                        "p-1.5 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors focus:outline-none",
                        deletingId === resume.id && "opacity-50 cursor-not-allowed"
                      )}
                      title="Delete Resume"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Fallback full overlay clickable area for better UX on mobile */}
                <Link
                  href={`/builder?id=${resume.id}`}
                  className="absolute inset-0 z-0 hidden sm:block focus:outline-none"
                  aria-label={`Edit ${resume.title}`}
                  tabIndex={-1}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
