


"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Download, Maximize2 } from "lucide-react";
import { ResumePreview } from "@/components/ResumePreview";
import { toast } from "sonner";

const Builder = ({ searchParams }) => {
  const router = useRouter();

  const templateParam = searchParams.get("template");
  const [activeTemplate, setActiveTemplate] = useState(templateParam || "modern");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
    },
    summary: "",
    experience: [{ title: "", company: "", duration: "", description: "" }],
    education: [{ degree: "", school: "", year: "" }],
    skills: [],
    projects: [{ name: "", techStack: "", date: "", description: "" }],
    certifications: [{ name: "", date: "", issuer: "" }],
  });

  const inputClass =
    "w-full p-3 rounded-lg bg-gray-50 shadow-inner shadow-gray-300/60 focus:outline-none focus:shadow-lg transition";

  const textareaClass =
    "w-full p-3 rounded-lg bg-gray-50 shadow-inner shadow-gray-300/60 focus:outline-none focus:shadow-lg transition";

  const cardClass =
    "bg-white p-6 rounded-xl shadow-xl shadow-gray-300/60 hover:shadow-2xl transition space-y-4";

  const updatePersonalInfo = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updateExperience = (index, field, value) => {
    const newExperience = [...resumeData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setResumeData((prev) => ({ ...prev, experience: newExperience }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", duration: "", description: "" }],
    }));
  };

  const updateEducation = (index, field, value) => {
    const newEducation = [...resumeData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setResumeData((prev) => ({ ...prev, education: newEducation }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", year: "" }],
    }));
  };

  const handleSkillsChange = (value) => {
    setResumeData((prev) => ({
      ...prev,
      skills: value.split(",").map((s) => s.trim()).filter((s) => s),
    }));
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...(resumeData.projects || [])];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setResumeData((prev) => ({ ...prev, projects: newProjects }));
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), { name: "", techStack: "", date: "", description: "" }],
    }));
  };

  const updateCertification = (index, field, value) => {
    const newCertifications = [...(resumeData.certifications || [])];
    newCertifications[index] = { ...newCertifications[index], [field]: value };
    setResumeData((prev) => ({ ...prev, certifications: newCertifications }));
  };

  const addCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [...(prev.certifications || []), { name: "", date: "", issuer: "" }],
    }));
  };

  const handleDownload = () => {
    window.print();
    toast.success("Resume ready! Save as PDF using print dialog.");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white/60 backdrop-blur sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/resumebuilder/templates")}
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-2 text-indigo-600 font-bold">
            <Sparkles className="w-5 h-5" />
            <span>Resume Builder</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex gap-2 items-center px-3 py-2 rounded-md text-sm hover:bg-gray-100"
            >
              <Maximize2 className="w-4 h-4" /> Fullscreen
            </button>

            <button
              onClick={handleDownload}
              className="flex gap-2 items-center bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
            >
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Form */}
          <div className="space-y-6 print:hidden">

            {/* Personal Info */}
            <div className={cardClass}>
              <h2 className="text-xl font-bold text-indigo-600">Personal Information</h2>

              <input
                className={inputClass}
                placeholder="Full Name"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  className={inputClass}
                  placeholder="Email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  className={inputClass}
                  placeholder="Location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="LinkedIn"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                />
              </div>
            </div>

            {/* Summary */}
            <div className={cardClass}>
              <h2 className="text-xl font-bold text-indigo-600">Summary</h2>
              <textarea
                rows={4}
                className={textareaClass}
                value={resumeData.summary}
                onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
              />
            </div>

            {/* Work Experience */}
            <div className={cardClass}>
              <h2 className="text-xl font-bold text-indigo-600">Work Experience</h2>

              {resumeData.experience.map((exp, index) => (
                <div key={index} className="rounded-xl p-4 shadow-inner shadow-gray-200 space-y-2">
                  <input
                    className={inputClass}
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => updateExperience(index, "title", e.target.value)}
                  />

                  <input
                    className={inputClass}
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                  />

                  <input
                    className={inputClass}
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => updateExperience(index, "duration", e.target.value)}
                  />

                  <textarea
                    rows={3}
                    className={textareaClass}
                    placeholder="Description..."
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                  />
                </div>
              ))}

              <button
                onClick={addExperience}
                className="w-full bg-gray-50 shadow-inner shadow-gray-300 py-2 rounded-xl hover:shadow-md"
              >
                + Add Experience
              </button>
            </div>

            {/* Education */}
            <div className={cardClass}>
              <h2 className="text-xl font-bold text-indigo-600">Education</h2>

              {resumeData.education.map((edu, index) => (
                <div key={index} className="rounded-xl p-4 shadow-inner shadow-gray-200 space-y-2">
                  <input
                    className={inputClass}
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  />

                  <input
                    className={inputClass}
                    placeholder="School"
                    value={edu.school}
                    onChange={(e) => updateEducation(index, "school", e.target.value)}
                  />

                  <input
                    className={inputClass}
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => updateEducation(index, "year", e.target.value)}
                  />
                </div>
              ))}

              <button
                onClick={addEducation}
                className="w-full bg-gray-50 shadow-inner shadow-gray-300 py-2 rounded-xl hover:shadow-md"
              >
                + Add Education
              </button>
            </div>

            {/* Skills */}
            <div className={cardClass}>
              <h2 className="text-xl font-bold text-indigo-600">Skills</h2>
              <textarea
                rows={3}
                className={textareaClass}
                value={resumeData.skills.join(", ")}
                onChange={(e) => handleSkillsChange(e.target.value)}
                placeholder="JavaScript, React, Node..."
              />
            </div>

            {/* Projects */}
            <div className={cardClass}>
              <h2 className="text-xl font-bold text-indigo-600">Projects</h2>

              {resumeData.projects.map((project, index) => (
                <div key={index} className="rounded-xl p-4 shadow-inner shadow-gray-200 space-y-2">
                  <input
                    className={inputClass}
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                  />

                  <input
                    className={inputClass}
                    placeholder="Tech Stack"
                    value={project.techStack}
                    onChange={(e) => updateProject(index, "techStack", e.target.value)}
                  />

                  <input
                    className={inputClass}
                    placeholder="Date"
                    value={project.date}
                    onChange={(e) => updateProject(index, "date", e.target.value)}
                  />

                  <textarea
                    rows={3}
                    className={textareaClass}
                    placeholder="Description..."
                    value={project.description}
                    onChange={(e) => updateProject(index, "description", e.target.value)}
                  />
                </div>
              ))}

              <button
                onClick={addProject}
                className="w-full bg-gray-50 shadow-inner shadow-gray-300 py-2 rounded-xl hover:shadow-md"
              >
                + Add Project
              </button>
            </div>

            {/* Certifications */}
            <div className={cardClass}>
              <h2 className="text-xl font-bold text-indigo-600">Certifications</h2>

              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="rounded-xl p-4 shadow-inner shadow-gray-200 space-y-2">
                  <input
                    className={inputClass}
                    placeholder="Certificate Name"
                    value={cert.name}
                    onChange={(e) => updateCertification(index, "name", e.target.value)}
                  />

                  <input
                    className={inputClass}
                    placeholder="Issuer"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                  />

                  <input
                    className={inputClass}
                    placeholder="Date"
                    value={cert.date}
                    onChange={(e) => updateCertification(index, "date", e.target.value)}
                  />
                </div>
              ))}

              <button
                onClick={addCertification}
                className="w-full bg-gray-50 shadow-inner shadow-gray-300 py-2 rounded-xl hover:shadow-md"
              >
                + Add Certification
              </button>
            </div>
          </div>

          {/* Resume Preview */}
          <div className="lg:sticky lg:top-24 h-fit bg-white p-6 rounded-xl shadow-2xl shadow-gray-300">
            <ResumePreview data={resumeData} template={activeTemplate} />
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur flex justify-center items-center z-50">
          <div className="bg-white max-w-4xl w-full h-[90vh] overflow-auto rounded-xl p-8 relative">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <ResumePreview data={resumeData} template={activeTemplate} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;
