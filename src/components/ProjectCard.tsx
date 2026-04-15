"use client";

import { useState, useRef } from "react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setHovered(true), 150);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered(false);
    setExpanded(false);
  };

  return (
    <div
      ref={cardRef}
      className="project-card-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        animationDelay: `${index * 0.08}s`,
      }}
    >
      {/* Base card */}
      <div
        className="project-card"
        style={{
          transform: hovered
            ? "scale(1.04) translateY(-4px)"
            : "scale(1) translateY(0)",
        }}
      >
        {/* Preview area */}
        <div
          className="project-preview"
          style={{
            background: project.previewImage
              ? `url(${project.previewImage}) center/cover no-repeat`
              : project.previewGradient,
          }}
        >
          {/* Shimmer effect on hover */}
          <div
            className="preview-shimmer"
            style={{ opacity: hovered ? 1 : 0 }}
          />

          {/* Index number */}
          <span className="project-index">{project.id}</span>

          {/* Featured badge */}
          {project.featured && <span className="featured-badge">Featured</span>}
        </div>

        {/* Card info (always visible) */}
        <div className="project-info">
          <div className="project-meta">
            <span className="project-category" style={{ color: project.color }}>
              {project.category}
            </span>
            <span className="project-year">{project.year}</span>
          </div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc h-16 ">{project.description}</p>
        </div>

        {/* Netflix-style expanded panel */}
        <div
          className="project-expand"
          style={{
            maxHeight: hovered ? "100%" : "0px",
            opacity: hovered ? 1 : 0,
            paddingTop: hovered ? "16px" : "0",
            paddingBottom: hovered ? "20px" : "0",
          }}
        >
          <p className="expand-long-desc">{project.longDescription}</p>

          {/* Tags */}
          <div className="tags-row">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="action-row">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ background: project.color, color: "#000" }}
              onClick={(e) => e.stopPropagation()}
            >
              <span>▶</span> Live Site
            </a>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .project-card-wrapper {
          position: relative;
          animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .project-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          transition:
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.35s ease,
            border-color 0.3s ease;
          box-shadow: ${hovered
            ? `0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px ${project.color}33`
            : "0 4px 20px rgba(0,0,0,0.3)"};
          border-color: ${hovered ? project.color + "44" : "var(--border)"};
          cursor: pointer;
        }

        .project-preview {
          height: 180px;
          position: relative;
          overflow: hidden;
        }

        .preview-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.04) 50%,
            transparent 60%
          );
          background-size: 200% 100%;
          transition: opacity 0.3s;
          animation: ${hovered ? "shimmer 1.5s infinite" : "none"};
        }

        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 300% 0;
          }
        }

        .project-index {
          position: absolute;
          top: 12px;
          left: 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(255, 255, 255, 0.3);
          letter-spacing: 0.05em;
        }

        .featured-badge {
          position: absolute;
          top: 12px;
          right: 14px;
          font-size: 9px;
          font-family: var(--font-mono);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: var(--accent);
          color: #000;
          padding: 3px 8px;
          border-radius: 3px;
          font-weight: 600;
        }

        .project-info {
          padding: 18px 20px 16px;
        }

        .project-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .project-category {
          font-size: 10px;
          font-family: var(--font-mono);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .project-year {
          font-size: 10px;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }

        .project-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 6px;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .project-desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.5;
          font-family: var(--font-mono);
        }

        .project-expand {
          overflow: hidden;
          transition:
            max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.3s ease,
            padding 0.3s ease;
          padding: 0 20px;
        }

        .expand-long-desc {
          font-size: 12px;
          color: var(--text-secondary);
          font-family: var(--font-mono);
          line-height: 1.6;
          margin-bottom: 12px;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 14px;
        }

        .tag {
          font-size: 9px;
          font-family: var(--font-mono);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          background: var(--surface-2);
          border: 1px solid var(--border);
          padding: 3px 8px;
          border-radius: 4px;
        }

        .action-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
          font-family: var(--font-display);
          letter-spacing: -0.01em;
          text-decoration: none;
          transition:
            transform 0.15s,
            opacity 0.15s;
        }

        .btn-primary:hover {
          transform: scale(1.03);
          opacity: 0.9;
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--text-secondary);
          border: 1px solid var(--border);
          text-decoration: none;
          transition:
            color 0.2s,
            border-color 0.2s;
        }

        .btn-ghost:hover {
          color: var(--text-primary);
          border-color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
