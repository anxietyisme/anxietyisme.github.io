import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of software engineering, game dev, and technical projects.",
};

const projects = [
  {
    title: "no projects yet",
    description: "random project placeholder.",
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
