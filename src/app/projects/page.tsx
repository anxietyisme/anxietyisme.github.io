import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of software engineering, game dev, and technical projects.",
};

const projects = [
  {
    title: "SOMEJET",
    description: "1:40 scale RC model of India's AMCA stealth fighter. Aerodynamic optimization using 2D panel methods, VLM, and multi-objective differential evolution.",
    external: "https://github.com",
  },
  {
    title: "BYTE TUI Dashboard",
    description: "A hacker-style personal intelligence environment with AI streaming, system telemetry, and task management.",
    external: "https://github.com",
  },
  {
    title: "Topology Visualizer",
    description: "Interactive WebGL application for visualizing topological spaces, fundamental groups, and covering spaces.",
    external: "https://github.com",
  },
  {
    title: "Lattice Boltzmann CFD",
    description: "GPU-accelerated lattice Boltzmann method for 2D fluid dynamics simulation.",
    external: "https://github.com",
  },
];

export default function ProjectsPage() {
  return (
    <div className="px-6 py-12">
      <h1 className="text-2xl font-normal mb-8">Projects</h1>

      <ul className="space-y-6">
        {projects.map((project) => (
          <li key={project.title}>
            <a
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent hover:underline decoration-border underline-offset-4 text-lg"
            >
              {project.title}
            </a>
            <p className="text-base mt-2">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
