import { Brain, PenTool, Briefcase, Rocket } from "lucide-react";

export default function Process() {
  const steps = [
    {
      icon: <PenTool className="w-10 h-10 text-indigo-600" />,
      title: "1. Create Your Profile",
      desc: "Upload your resume and tell us your skills and preferences.",
    },
    {
      icon: <Brain className="w-10 h-10 text-indigo-600" />,
      title: "2. AI Job Matching",
      desc: "Our AI finds jobs that align with your skills and career goals.",
    },
    {
      icon: <Briefcase className="w-10 h-10 text-indigo-600" />,
      title: "3. Interview Preparation",
      desc: "Get mock interviews, practice questions, and confidence boosters.",
    },
    {
      icon: <Rocket className="w-10 h-10 text-indigo-600" />,
      title: "4. Get Placed",
      desc: "Land your dream job faster and smarter than ever.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <div key={i} className="p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
