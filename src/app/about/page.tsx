import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Background, interests, and contact information.",
};

export default function AboutPage() {
  return (
    <div className="px-6 py-12 prose prose-neutral dark:prose-invert">
      <h1 className="text-2xl font-normal mb-8">About</h1>
      
      <p>
        I am a student and developer primarily interested in mathematics, physics, and computer science. 
        My work often involves systems programming, algorithm design, and applied mathematics.
      </p>

      <h2>Interests</h2>
      <ul>
        <li>Algebraic Topology</li>
        <li>Quantum Mechanics</li>
        <li>Differential Geometry</li>
        <li>Systems Programming (C, C++, Rust)</li>
        <li>Numerical Methods & Simulation</li>
      </ul>

      <h2>Contact</h2>
      <p>
        You can reach me via email at <a href="mailto:hello@example.com">hello@example.com</a>.
        <br />
        My code is available on <a href="https://github.com">GitHub</a>.
      </p>
    </div>
  );
}
