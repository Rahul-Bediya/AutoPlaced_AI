import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

export const ResumePreview = ({ data, template }) => {
  const Container = ({ children }) => (
    <div className="p-8 bg-white rounded-lg shadow-xl border border-gray-200 print:shadow-none print:border-none transition-all duration-300 hover:shadow-2xl">
      {children}
    </div>
  );

  // Technical template layout
  if (template === "technical") {
    return (
      <Container>
        <div className="space-y-5">
          {/* Header */}
          <div className="border-b-2 border-indigo-500 pb-3">
            <h1 className="text-3xl font-bold text-gray-900">
              {data.personalInfo.fullName || "Your Name"}
            </h1>
            <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-2">
              {data.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {data.personalInfo.location}
                </div>
              )}
              {data.personalInfo.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="w-3 h-3" />
                  {data.personalInfo.linkedin}
                </div>
              )}
            </div>
          </div>

          {/* Education */}
          {data.education.some(edu => edu.degree || edu.school) && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide">
                Education
              </h2>
              <div className="space-y-2">
                {data.education.map((edu, index) =>
                  edu.degree || edu.school ? (
                    <div key={index} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium text-gray-900">{edu.school}</p>
                        <p className="text-xs text-gray-600">{edu.degree}</p>
                      </div>
                      <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                        {edu.year}
                      </span>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Technical Skills */}
          {data.skills.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide">
                Technical Skills
              </h2>
              <p className="text-sm text-gray-700">
                {data.skills.join(", ")}
              </p>
            </div>
          )}

          {/* Experience */}
          {data.experience.some(exp => exp.title || exp.company) && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide">
                Experience
              </h2>
              <div className="space-y-3">
                {data.experience.map((exp, index) =>
                  exp.title || exp.company ? (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <h3 className="font-semibold text-sm text-gray-900">
                          {exp.company} | {exp.title}
                        </h3>
                        <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                          {exp.duration}
                        </span>
                      </div>
                      {exp.description && (
                        <ul className="text-sm text-gray-700 ml-4 list-disc">
                          {exp.description.split("\n").map((line, i) =>
                            line.trim() && <li key={i}>{line}</li>
                          )}
                        </ul>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects?.some(proj => proj.name) && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide">
                Projects
              </h2>
              <div className="space-y-3">
                {data.projects.map((project, index) =>
                  project.name ? (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <h3 className="font-semibold text-sm text-gray-900">
                          {project.name}{" "}
                          <span className="text-xs text-gray-600">
                            | {project.techStack}
                          </span>
                        </h3>
                        <span className="text-xs text-gray-600 whitespace-nowrap ml-4">
                          {project.date}
                        </span>
                      </div>
                      {project.description && (
                        <ul className="text-sm text-gray-700 ml-4 list-disc">
                          {project.description.split("\n").map((line, i) =>
                            line.trim() && <li key={i}>{line}</li>
                          )}
                        </ul>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications?.some(cert => cert.name) && (
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2 uppercase tracking-wide">
                Certifications
              </h2>
              <ul className="space-y-1 text-sm text-gray-700 list-disc ml-4">
                {data.certifications.map((cert, index) =>
                  cert.name ? (
                    <li key={index}>
                      {cert.name} - {cert.date} {cert.issuer}
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}
        </div>
      </Container>
    );
  }

  // Default template
  return (
    <Container>
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b-2 border-indigo-500 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data.personalInfo.fullName || "Your Name"}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {data.personalInfo.location}
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                {data.personalInfo.linkedin}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide text-gray-900 mb-1">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-wide text-gray-900 mb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-md border border-indigo-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};
