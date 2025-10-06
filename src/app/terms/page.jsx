import { termsContent } from "../../../data/terms.js";

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-primary-foreground opacity-90">
          We're here to help. Reach out via form, email, or phone.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            {termsContent.title}
          </h2>
          <p className="text-secondary mb-8">{termsContent.lastUpdated}</p>

          <div className="space-y-8">
            {termsContent.sections.map((section, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {section.title}
                </h3>
                <div className="space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold text-primary mb-2">
              Questions About These Terms?
            </h3>
            <p className="text-gray-700">
              If you have any questions about these Terms of Service, please
              don't hesitate to contact us. We're committed to ensuring you
              understand how these terms apply to your use of our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
